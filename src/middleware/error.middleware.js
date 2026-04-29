import { Prisma } from '@prisma/client';

export const errorHandler = (err, req, res, next) => {
  console.error(err);

  if (err instanceof Prisma.PrismaClientKnownRequestError) {
    if (err.code === 'P2002') {
      return res.status(409).json({
        message: 'A record with this unique value already exists.',
        details: err.meta?.target ?? null
      });
    }

    if (err.code === 'P2003') {
      return res.status(400).json({
        message: 'Invalid relationship reference.',
        details: err.meta ?? null
      });
    }

    if (err.code === 'P2025') {
      return res.status(404).json({
        message: 'Record not found.'
      });
    }
  }

  const statusCode = err.statusCode || 500;

  return res.status(statusCode).json({
    message: err.message || 'Internal server error',
    details: err.details || null
  });
};
