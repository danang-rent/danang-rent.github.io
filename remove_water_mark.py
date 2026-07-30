import os
from simple_lama_inpainting import SimpleLama
from PIL import Image
# /home/v/.cache/torch/hub/checkpoints/big-lama.pt

lama = SimpleLama()

# Paths
input_folder = "img_in_0"
output_folder = "img_out"
mask_path = "mask.png"  # Your single static mask

# Load the mask once
mask = Image.open(mask_path).convert('L')

# Ensure output directory exists
os.makedirs(output_folder, exist_ok=True)

# Process all images
for filename in os.listdir(input_folder):
    if filename.lower().endswith(('.png', '.jpg', '.jpeg')):
        img_path = os.path.join(input_folder, filename)
        image = Image.open(img_path)
        
        # Resize mask if images vary in size (optional, if all are same size skip this)
        if image.size != mask.size:
            current_mask = mask.resize(image.size, resample=Image.NEAREST)
        else:
            current_mask = mask

        # Inpaint
        result = lama(image, current_mask)
        
        # Save
        result.save(os.path.join(output_folder, filename))
        print(f"Processed: {filename}")   