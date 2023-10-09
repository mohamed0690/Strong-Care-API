export const catchAsyncError = (asyncFn) => (req, res, next) => {
  return asyncFn(req, res, next).catch(next);
};
