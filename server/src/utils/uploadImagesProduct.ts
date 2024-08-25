import multer from 'multer';

const diskStorage = multer.diskStorage({
  destination: (_, __, cb) => {
    cb(null, 'upload/products');
  },
  filename: (_, file, cb) => {
    const ext = file.mimetype.split('/')[1];
    const fileName = `product-${Date.now()}.${ext}`;
    cb(null, fileName);
  },
});

const fileFilter = (_: any, file: Express.Multer.File, cb: multer.FileFilterCallback) => {
  const checkImg = file.mimetype.split('/')[0];
  if (checkImg === 'image') {
    return cb(null, true);
  } else {
    return cb(null, false);
  }
};

const upload = multer({ storage: diskStorage, fileFilter }) as multer.Multer;

export const uploadFields = upload.fields([
  { name: 'mainImage', maxCount: 1 },
  { name: 'images', maxCount: 4 },
]) as any;
