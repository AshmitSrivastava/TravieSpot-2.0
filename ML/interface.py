import torch
from diffusers.utils import load_image
from photomaker import PhotoMakerStableDiffusionXLPipeline
from diffusers import EulerDiscreteScheduler
import os

def generate_images(input_id_images, prompt, negative_prompt, device='cuda', num_steps=50):
    photomaker_path = 'path_to_your_photomaker_model/photomaker-v1.bin'  # Update path
    base_model_path = 'path_to_base_model'  # Update with your base model path

    pipe = PhotoMakerStableDiffusionXLPipeline.from_pretrained(
        base_model_path,
        torch_dtype=torch.bfloat16,
        use_safetensors=True,
        variant="fp16"
    ).to(device)

    pipe.load_photomaker_adapter(
        os.path.dirname(photomaker_path),
        subfolder="",
        weight_name=os.path.basename(photomaker_path),
        trigger_word="img"
    )

    pipe.scheduler = EulerDiscreteScheduler.from_config(pipe.scheduler.config)
    pipe.fuse_lora()

    generator = torch.Generator(device=device).manual_seed(42)
    images = pipe(
        prompt=prompt,
        input_id_images=input_id_images,
        negative_prompt=negative_prompt,
        num_images_per_prompt=1,
        num_inference_steps=num_steps,
        start_merge_step=10,
        generator=generator,
    ).images[0]

    return images
