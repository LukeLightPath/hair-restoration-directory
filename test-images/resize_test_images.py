"""
Resize and crop generated test images into different aspect ratios
for testing the dashboard image upload feature.
"""
from PIL import Image
import os
import shutil

SRC = r"C:\Users\lukes\.gemini\antigravity\brain\8d8063f6-3c70-4b8b-88bd-64d430c42a54"
DST = os.path.dirname(os.path.abspath(__file__))

# Find source files by prefix
src_files = {}
for f in os.listdir(SRC):
    if f.endswith('.png'):
        for key in ['test_clinic_logo', 'test_gallery_wide', 'test_gallery_portrait',
                     'test_gallery_square', 'test_gallery_ultrawide', 'test_gallery_large',
                     'test_gallery_small']:
            if f.startswith(key):
                src_files[key] = os.path.join(SRC, f)

print("Found source files:")
for k, v in src_files.items():
    img = Image.open(v)
    print(f"  {k}: {img.size}")

# Define target sizes with crop + resize
targets = {
    # Logo - square, 400x400 as recommended
    'logo_400x400.png': {
        'src': 'test_clinic_logo',
        'size': (400, 400),
    },
    # Gallery - wide landscape (typical clinic interior shot)
    'gallery_wide_1200x800.jpg': {
        'src': 'test_gallery_wide',
        'crop_ratio': (3, 2),  # 3:2 landscape
        'size': (1200, 800),
    },
    # Gallery - portrait (vertical treatment photo)
    'gallery_portrait_600x900.jpg': {
        'src': 'test_gallery_portrait',
        'crop_ratio': (2, 3),  # 2:3 portrait
        'size': (600, 900),
    },
    # Gallery - square
    'gallery_square_800x800.jpg': {
        'src': 'test_gallery_square',
        'size': (800, 800),
    },
    # Gallery - ultrawide panoramic
    'gallery_ultrawide_1600x600.jpg': {
        'src': 'test_gallery_ultrawide',
        'crop_ratio': (8, 3),  # very wide
        'size': (1600, 600),
    },
    # Gallery - large high-res 4:3
    'gallery_large_2000x1500.jpg': {
        'src': 'test_gallery_large',
        'crop_ratio': (4, 3),
        'size': (2000, 1500),
    },
    # Gallery - small thumbnail
    'gallery_small_400x300.jpg': {
        'src': 'test_gallery_small',
        'crop_ratio': (4, 3),
        'size': (400, 300),
    },
}

def crop_to_ratio(img, w_ratio, h_ratio):
    """Center-crop an image to the target aspect ratio."""
    w, h = img.size
    target_ratio = w_ratio / h_ratio
    current_ratio = w / h
    
    if current_ratio > target_ratio:
        # Too wide, crop width
        new_w = int(h * target_ratio)
        left = (w - new_w) // 2
        return img.crop((left, 0, left + new_w, h))
    else:
        # Too tall, crop height
        new_h = int(w / target_ratio)
        top = (h - new_h) // 2
        return img.crop((0, top, w, top + new_h))

print("\nGenerating resized test images:")
for filename, config in targets.items():
    src_key = config['src']
    if src_key not in src_files:
        print(f"  SKIP {filename} — source not found")
        continue
    
    img = Image.open(src_files[src_key]).convert('RGB')
    
    # Crop to aspect ratio if needed
    if 'crop_ratio' in config:
        img = crop_to_ratio(img, *config['crop_ratio'])
    
    # Resize to target
    img = img.resize(config['size'], Image.LANCZOS)
    
    out_path = os.path.join(DST, filename)
    
    if filename.endswith('.png'):
        img.save(out_path, 'PNG')
    else:
        img.save(out_path, 'JPEG', quality=90)
    
    print(f"  OK {filename} - {config['size'][0]}x{config['size'][1]}")

# Also save logo as PNG (keeps transparency potential)
print(f"\nAll test images saved to: {DST}")
print("\nImage summary for upload testing:")
print("  LOGO:    logo_400x400.png          — 400×400 (square, as recommended)")
print("  GALLERY: gallery_wide_1200x800.jpg  — 1200×800 (3:2 landscape)")
print("  GALLERY: gallery_portrait_600x900.jpg — 600×900 (2:3 portrait)")
print("  GALLERY: gallery_square_800x800.jpg — 800×800 (1:1 square)")
print("  GALLERY: gallery_ultrawide_1600x600.jpg — 1600×600 (8:3 ultrawide)")
print("  GALLERY: gallery_large_2000x1500.jpg — 2000×1500 (4:3 large)")
print("  GALLERY: gallery_small_400x300.jpg  — 400×300 (4:3 small)")
