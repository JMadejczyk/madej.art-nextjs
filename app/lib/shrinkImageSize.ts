const shrinkImageSize = (
  width: number,
  height: number,
  targetWidth: number
) => {
  const aspectRatio = width / height;
  if (width > targetWidth) {
    return { width: targetWidth, height: targetWidth / aspectRatio };
  } else {
    return { width: width, height: width / aspectRatio };
  }
};

const shrinkImageSizeModal = (
  width: number,
  height: number,
  targetWidth: number
) => {
  const aspectRatio = width / height;
  if (width > height) {
    console.log({ width: targetWidth, height: targetWidth / aspectRatio });
    return {
      width: targetWidth,
      height: Math.round(targetWidth / aspectRatio),
    };
  } else {
    console.log({
      width: targetWidth * aspectRatio * aspectRatio,
      height: targetWidth * aspectRatio,
    });
    return {
      width: targetWidth * aspectRatio * aspectRatio,
      height: targetWidth * aspectRatio,
    };
  }
};

export { shrinkImageSize, shrinkImageSizeModal };
