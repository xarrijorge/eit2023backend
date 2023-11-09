import cloudinary from 'cloudinary';

// upload image to cloudinary
export const uploadImage = async (image) => {
    try {
        const res = await cloudinary.v2.uploader.upload(image, {
            folder: 'EITPhotos',
            width: 300,
            crop: 'scale',
        });
        return res;
    } catch (err) {
        console.log(err);
    }
}