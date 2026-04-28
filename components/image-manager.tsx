'use client'

import { useState, useCallback } from 'react'
import Image from 'next/image'
import {
  Upload, X, Loader2, CheckCircle, AlertCircle, Image as ImageIcon,
  GripVertical, Trash2, Camera, Building2,
} from 'lucide-react'
import { cn } from '@/lib/utils'
import type { ListingImage } from '@/lib/types'

interface ImageManagerProps {
  listingId: string
  listingTitle: string
  initialImages: ListingImage[]
  initialLogoUrl: string | null
}

export default function ImageManager({
  listingId,
  listingTitle,
  initialImages,
  initialLogoUrl,
}: ImageManagerProps) {
  const [images, setImages] = useState<ListingImage[]>(initialImages)
  const [logoUrl, setLogoUrl] = useState<string | null>(initialLogoUrl)
  const [uploading, setUploading] = useState(false)
  const [uploadingLogo, setUploadingLogo] = useState(false)
  const [feedback, setFeedback] = useState<{ type: 'success' | 'error'; message: string } | null>(null)
  const [dragIndex, setDragIndex] = useState<number | null>(null)
  const [dragOverIndex, setDragOverIndex] = useState<number | null>(null)
  const [deletingId, setDeletingId] = useState<string | null>(null)
  const [deletingLogo, setDeletingLogo] = useState(false)

  const MAX_IMAGES = 10

  function showFeedback(type: 'success' | 'error', message: string) {
    setFeedback({ type, message })
    setTimeout(() => setFeedback(null), 4000)
  }

  /* ── Logo upload ── */
  async function handleLogoUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (!file) return
    e.target.value = ''

    setUploadingLogo(true)
    try {
      const formData = new FormData()
      formData.append('file', file)

      const res = await fetch(`/api/listings/${listingId}/logo`, {
        method: 'POST',
        body: formData,
      })

      if (!res.ok) {
        const data = await res.json()
        throw new Error(data.error || 'Logo upload failed')
      }

      const data = await res.json()
      setLogoUrl(data.logo_url)
      showFeedback('success', 'Logo uploaded successfully.')
    } catch (err) {
      showFeedback('error', err instanceof Error ? err.message : 'Logo upload failed')
    } finally {
      setUploadingLogo(false)
    }
  }

  /* ── Logo remove ── */
  async function handleLogoRemove() {
    setDeletingLogo(true)
    try {
      const res = await fetch(`/api/listings/${listingId}/logo`, { method: 'DELETE' })
      if (!res.ok) {
        const data = await res.json()
        throw new Error(data.error || 'Failed to remove logo')
      }
      setLogoUrl(null)
      showFeedback('success', 'Logo removed.')
    } catch (err) {
      showFeedback('error', err instanceof Error ? err.message : 'Failed to remove logo')
    } finally {
      setDeletingLogo(false)
    }
  }

  /* ── Gallery image upload ── */
  async function handleImageUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const fileList = e.target.files
    if (!fileList || fileList.length === 0) return
    const files = Array.from(fileList)
    e.target.value = ''

    if (images.length + files.length > MAX_IMAGES) {
      showFeedback('error', `You can upload up to ${MAX_IMAGES} images. You have ${images.length} already.`)
      return
    }

    setUploading(true)
    const uploaded: ListingImage[] = []
    const errors: string[] = []

    for (const file of files) {
      try {
        const formData = new FormData()
        formData.append('file', file)
        formData.append('alt_text', `${listingTitle} clinic photo`)

        const res = await fetch(`/api/listings/${listingId}/images`, {
          method: 'POST',
          body: formData,
        })

        if (!res.ok) {
          const data = await res.json()
          throw new Error(data.error || `Failed to upload ${file.name}`)
        }

        const data = await res.json()
        uploaded.push(data.image)
      } catch (err) {
        errors.push(err instanceof Error ? err.message : `Failed to upload ${file.name}`)
      }
    }

    if (uploaded.length > 0) {
      setImages(prev => [...prev, ...uploaded])
    }

    if (errors.length > 0) {
      showFeedback('error', errors.join('. '))
    } else {
      showFeedback('success', `${uploaded.length} ${uploaded.length === 1 ? 'image' : 'images'} uploaded.`)
    }

    setUploading(false)
  }

  /* ── Delete gallery image ── */
  async function handleDelete(imageId: string) {
    setDeletingId(imageId)
    try {
      const res = await fetch(`/api/listings/${listingId}/images/${imageId}`, {
        method: 'DELETE',
      })

      if (!res.ok) {
        const data = await res.json()
        throw new Error(data.error || 'Failed to delete')
      }

      setImages(prev => prev.filter(img => img.id !== imageId))
      showFeedback('success', 'Image deleted.')
    } catch (err) {
      showFeedback('error', err instanceof Error ? err.message : 'Failed to delete')
    } finally {
      setDeletingId(null)
    }
  }

  /* ── Drag and drop reorder ── */
  function handleDragStart(index: number) {
    setDragIndex(index)
  }

  function handleDragOver(e: React.DragEvent, index: number) {
    e.preventDefault()
    setDragOverIndex(index)
  }

  function handleDragEnd() {
    setDragIndex(null)
    setDragOverIndex(null)
  }

  async function handleDrop(e: React.DragEvent, dropIndex: number) {
    e.preventDefault()
    if (dragIndex === null || dragIndex === dropIndex) {
      handleDragEnd()
      return
    }

    const newImages = [...images]
    const [draggedImage] = newImages.splice(dragIndex, 1)
    newImages.splice(dropIndex, 0, draggedImage)

    setImages(newImages)
    handleDragEnd()

    // Save new order
    try {
      const res = await fetch(`/api/listings/${listingId}/images/reorder`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ imageIds: newImages.map(img => img.id) }),
      })

      if (!res.ok) {
        const data = await res.json()
        throw new Error(data.error || 'Failed to save order')
      }
    } catch (err) {
      showFeedback('error', err instanceof Error ? err.message : 'Failed to save order')
      // Revert on error
      setImages(initialImages)
    }
  }

  return (
    <div className="space-y-6">
      {/* ── Header ── */}
      <div>
        <h1 className="text-2xl font-bold text-foreground">Images</h1>
        <p className="text-sm text-muted-foreground mt-1">
          Upload your clinic logo and gallery photos. These appear on your public listing.
        </p>
      </div>

      {/* ── Feedback ── */}
      {feedback && (
        <div
          className={cn(
            'flex items-center gap-2 rounded-xl px-4 py-3 text-sm font-medium animate-in fade-in slide-in-from-top-2 duration-300',
            feedback.type === 'success'
              ? 'bg-success/10 text-success border border-success/20'
              : 'bg-destructive/10 text-destructive border border-destructive/20'
          )}
        >
          {feedback.type === 'success' ? <CheckCircle className="h-4 w-4" /> : <AlertCircle className="h-4 w-4" />}
          {feedback.message}
        </div>
      )}

      {/* ══════════════════════════════════════════════ */}
      {/* ── Logo Section ── */}
      <div className="rounded-2xl border border-border bg-card p-6 shadow-sm">
        <h2 className="text-lg font-semibold text-card-foreground flex items-center gap-2 mb-2">
          <Building2 className="h-5 w-5 text-primary" />
          Clinic Logo
        </h2>
        <p className="text-sm text-muted-foreground mb-6">
          Your logo appears on your listing page and clinic cards. Use a square image for best results.
        </p>

        <div className="flex items-center gap-6">
          {/* Logo preview */}
          <div className="relative h-24 w-24 shrink-0 rounded-2xl border-2 border-dashed border-border bg-muted/30 overflow-hidden flex items-center justify-center">
            {logoUrl ? (
              <>
                <Image
                  src={logoUrl}
                  alt={`${listingTitle} logo`}
                  fill
                  className="object-cover"
                  sizes="96px"
                />
                {/* Remove overlay on hover */}
                <button
                  onClick={handleLogoRemove}
                  disabled={deletingLogo}
                  className="absolute inset-0 flex items-center justify-center bg-black/50 opacity-0 hover:opacity-100 transition-opacity cursor-pointer"
                  title="Remove logo"
                >
                  {deletingLogo ? (
                    <Loader2 className="h-5 w-5 text-white animate-spin" />
                  ) : (
                    <Trash2 className="h-5 w-5 text-white" />
                  )}
                </button>
              </>
            ) : (
              <Building2 className="h-8 w-8 text-muted-foreground/40" />
            )}
          </div>

          {/* Upload button */}
          <div className="space-y-2">
            <label
              htmlFor="logo-file-input"
              className={cn(
                'inline-flex items-center gap-2 rounded-xl bg-primary px-4 py-2.5 text-sm font-semibold text-primary-foreground shadow-sm transition-all hover:bg-primary-hover hover:shadow-md active:scale-[0.98] cursor-pointer',
                uploadingLogo && 'opacity-50 pointer-events-none'
              )}
            >
              {uploadingLogo ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <Upload className="h-4 w-4" />
              )}
              {logoUrl ? 'Replace logo' : 'Upload logo'}
            </label>
            <p className="text-xs text-muted-foreground">JPEG, PNG or WebP. Max 5 MB. Recommended: 400×400px.</p>
            <input
              id="logo-file-input"
              type="file"
              accept="image/jpeg,image/png,image/webp"
              onChange={handleLogoUpload}
              className="hidden"
            />
          </div>
        </div>
      </div>

      {/* ══════════════════════════════════════════════ */}
      {/* ── Gallery Section ── */}
      <div className="rounded-2xl border border-border bg-card p-6 shadow-sm">
        <div className="flex items-center justify-between mb-2">
          <h2 className="text-lg font-semibold text-card-foreground flex items-center gap-2">
            <Camera className="h-5 w-5 text-primary" />
            Gallery Photos
          </h2>
          <span className="text-xs font-medium text-muted-foreground bg-muted rounded-full px-2.5 py-1">
            {images.length} / {MAX_IMAGES}
          </span>
        </div>
        <p className="text-sm text-muted-foreground mb-6">
          Showcase your clinic with up to {MAX_IMAGES} photos. Drag to reorder — the first image becomes the hero on your listing.
        </p>

        {/* Image grid */}
        {images.length > 0 && (
          <div className="grid gap-3 grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 mb-6">
            {images.map((image, index) => (
              <div
                key={image.id}
                draggable
                onDragStart={() => handleDragStart(index)}
                onDragOver={(e) => handleDragOver(e, index)}
                onDragEnd={handleDragEnd}
                onDrop={(e) => handleDrop(e, index)}
                className={cn(
                  'group relative aspect-[4/3] rounded-xl overflow-hidden border-2 transition-all cursor-grab active:cursor-grabbing',
                  dragIndex === index && 'opacity-40 scale-95',
                  dragOverIndex === index && dragIndex !== index && 'border-primary shadow-lg scale-[1.02]',
                  dragOverIndex !== index && 'border-transparent hover:border-primary/20',
                )}
              >
                <Image
                  src={image.storage_path}
                  alt={image.alt_text || `${listingTitle} photo ${index + 1}`}
                  fill
                  className="object-cover"
                  sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                />

                {/* Overlay controls */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
                  {/* Drag handle */}
                  <div className="absolute top-2 left-2 flex h-7 w-7 items-center justify-center rounded-lg bg-black/40 backdrop-blur-sm">
                    <GripVertical className="h-4 w-4 text-white" />
                  </div>

                  {/* Hero badge on first image */}
                  {index === 0 && (
                    <span className="absolute top-2 right-2 rounded-md bg-primary/90 backdrop-blur-sm px-2 py-0.5 text-[10px] font-bold text-primary-foreground uppercase tracking-wider">
                      Hero
                    </span>
                  )}

                  {/* Delete button */}
                  <button
                    onClick={(e) => {
                      e.stopPropagation()
                      handleDelete(image.id)
                    }}
                    disabled={deletingId === image.id}
                    className="absolute bottom-2 right-2 flex h-8 w-8 items-center justify-center rounded-lg bg-destructive/90 backdrop-blur-sm text-white transition-all hover:bg-destructive hover:scale-110 disabled:opacity-50"
                    title="Delete image"
                  >
                    {deletingId === image.id ? (
                      <Loader2 className="h-4 w-4 animate-spin" />
                    ) : (
                      <Trash2 className="h-4 w-4" />
                    )}
                  </button>
                </div>

                {/* Sort order indicator */}
                <div className="absolute bottom-2 left-2 flex h-6 w-6 items-center justify-center rounded-md bg-black/40 backdrop-blur-sm text-[10px] font-bold text-white opacity-0 group-hover:opacity-100 transition-opacity">
                  {index + 1}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Upload dropzone */}
        {images.length < MAX_IMAGES && (
          <label
            htmlFor="gallery-file-input"
            className={cn(
              'block w-full rounded-2xl border-2 border-dashed transition-all py-10',
              uploading
                ? 'border-primary/30 bg-primary/5 cursor-wait pointer-events-none'
                : 'border-border bg-muted/20 hover:border-primary/40 hover:bg-primary/5 cursor-pointer'
            )}
          >
            <div className="flex flex-col items-center gap-3">
              {uploading ? (
                <Loader2 className="h-8 w-8 text-primary animate-spin" />
              ) : (
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10">
                  <Upload className="h-6 w-6 text-primary" />
                </div>
              )}
              <div>
                <p className="text-sm font-semibold text-foreground">
                  {uploading ? 'Uploading...' : 'Click to upload photos'}
                </p>
                <p className="text-xs text-muted-foreground mt-1">
                  JPEG, PNG or WebP. Max 5 MB each.
                </p>
              </div>
            </div>
          </label>
        )}

        <input
          id="gallery-file-input"
          type="file"
          accept="image/jpeg,image/png,image/webp"
          multiple
          onChange={handleImageUpload}
          className="hidden"
        />

        {/* Empty state */}
        {images.length === 0 && !uploading && (
          <div className="text-center py-4">
            <ImageIcon className="mx-auto h-8 w-8 text-muted-foreground/30 mb-2" />
            <p className="text-sm text-muted-foreground">
              No photos uploaded yet. Add images to make your listing stand out.
            </p>
          </div>
        )}
      </div>
    </div>
  )
}
