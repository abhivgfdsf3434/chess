import type { FC } from 'react';
import type { Piece } from '@/lib/chess-logic';
import { cn } from '@/lib/utils';

interface ChessPieceProps {
  piece: Piece;
  className?: string;
}

const pieceMap = {
  w: {
    k: (p: {className?: string}) => <svg {...p} viewBox="0 0 45 45"><g fill="#fff" stroke="#000" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M22.5 11.63V6M20 8h5"/><path d="M22.5 25s4.5-7.5 3-10.5c0 0-1.5-3-3-3s-3 3-3 3c-1.5 3 3 10.5 3 10.5" strokeLinejoin="miter"/><path d="M11.5 37c5.5 3.5 16.5 3.5 22 0v-7s-2 1.5-11 1.5-11-1.5-11-1.5v7z"/><path d="M11.5 30c5.5-3 16.5-3 22 0" strokeLinejoin="miter"/><path d="M11.5 30s-1.5-2.5-1.5-4 1.5-2.5 1.5-4-1.5-2.5-1.5-4 1.5-2 1.5-3.5-1.5-2.5-1.5-4 1.5-2.5 1.5-4"/><path d="M33.5 30s1.5-2.5 1.5-4-1.5-2.5-1.5-4 1.5-2.5 1.5-4-1.5-2-1.5-3.5 1.5-2.5 1.5-4-1.5-2.5-1.5-4"/><path d="M11.5 37.5s-2-1-2-3.5c0-2.5 2-3.5 2-3.5" strokeLinejoin="miter"/><path d="M33.5 37.5s2-1 2-3.5c0-2.5-2-3.5-2-3.5" strokeLinejoin="miter"/><path d="M14 14.5s-1.5 2.5-1.5 4"/><path d="M31 14.5s1.5 2.5 1.5 4"/></g></svg>,
    q: (p: {className?: string}) => <svg {...p} viewBox="0 0 45 45"><g fill="#fff" stroke="#000" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M6 13l2 2-1 5 2-1 2 4-2 2 1 3h26l1-3-2-2 2-4-1 1 2-2-1-5 2-2-3-1-1 2-2-1-1-3-1 2-2-1h-1v-2h-2v2h-1l-2 1-1-2-1 3-2 1-1-2-3 1z"/><path d="M9 26c8.5-1.5 21.5-1.5 30 0l-3 13H12l-3-13z"/><path d="M11 26h26" fill="none"/></g></svg>,
    r: (p: {className?: string}) => <svg {...p} viewBox="0 0 45 45"><g fill="#fff" stroke="#000" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M9 39h27v-3H9v3zM12 36v-4h21v4H12zM11 14V9h4v2h5V9h5v2h5V9h4v5" strokeLinejoin="miter"/><path d="M34 14l-3 3H14l-3-3"/><path d="M31 17v12.5H14V17" strokeLinejoin="miter"/><path d="M31 29.5l1.5 2.5H12.5L14 29.5"/><path d="M11 14h23" fill="none" strokeLinejoin="miter"/></g></svg>,
    b: (p: {className?: string}) => <svg {...p} viewBox="0 0 45 45"><g fill="#fff" stroke="#000" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M9 36c3.39-.97 10.11.43 13.5-2 3.39 2.43 10.11 1.03 13.5 2 0 0 1.65.54 3 2-.68.97-1.65.99-3 .5-3.39-.97-10.11.43-13.5-2-3.39 2.43-10.11 1.03-13.5 2 0 0-1.65.54-3 2-.68.97-1.65.99-3-.5z"/><path d="M15 32c2.5 2.5 12.5 2.5 15 0 .5-1.5 0-2 0-2 0-2.5-2.5-4-2.5-4 5.5-1.5 6-11.5-5-15.5-11 4-10.5 14-5 15.5 0 0-2.5 1.5-2.5 4 0 0-.5.5 0 2zM25 8.5c-1.5-2-5-2-6.5 0-1 1.5-1 4.5-1 4.5-.5 3.5 2.5 6 2.5 6s3-2.5 2.5-6c0 0 .5-3-1-4.5z"/></g></svg>,
    n: (p: {className?: string}) => <svg {...p} viewBox="0 0 45 45"><g fill="#fff" stroke="#000" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M22 10c10.5 1 11.5 8 11.5 10.5 0 2-1.5 4-4.5 4-2.5 0-4-1.5-4-4 0-2 1.5-3.5 1.5-6.5-1.5 1.5-3 3-4.5 5.5-1 2-2.5 3-2.5 5 0 2.5 2.5 4.5 2.5 4.5H10v-5c0-4.5 2-6.5 2-9.5-1-2-1-4-1-6 0-2.5 1.5-4 2.5-4s2 1.5 2 4-1 2.5-1 5c0 2.5 2.5 5 2.5 5"/><path d="M11.5 37c5.5 3.5 16.5 3.5 22 0v-7s-2 1.5-11 1.5-11-1.5-11-1.5v7zM11.5 30c5.5-3 16.5-3 22 0" strokeLinejoin="miter"/></g></svg>,
    p: (p: {className?: string}) => <svg {...p} viewBox="0 0 45 45"><g fill="#fff" stroke="#000" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M22.5 9c-2.21 0-4 1.79-4 4 0 2.21 1.79 4 4 4s4-1.79 4-4-1.79-4-4-4zm0 9c-4.42 0-8 3.58-8 8s3.58 8 8 8 8-3.58 8-8-3.58-8-8-8zM12 39h21" fill="none"/></g></svg>
  },
  b: {
    k: (p: {className?: string}) => <svg {...p} viewBox="0 0 45 45"><g fill="#000" stroke="#fff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M22.5 11.63V6M20 8h5"/><path d="M22.5 25s4.5-7.5 3-10.5c0 0-1.5-3-3-3s-3 3-3 3c-1.5 3 3 10.5 3 10.5" strokeLinejoin="miter"/><path d="M11.5 37c5.5 3.5 16.5 3.5 22 0v-7s-2 1.5-11 1.5-11-1.5-11-1.5v7z"/><path d="M11.5 30c5.5-3 16.5-3 22 0" strokeLinejoin="miter"/><path d="M11.5 30s-1.5-2.5-1.5-4 1.5-2.5 1.5-4-1.5-2.5-1.5-4 1.5-2 1.5-3.5-1.5-2.5-1.5-4 1.5-2.5 1.5-4"/><path d="M33.5 30s1.5-2.5 1.5-4-1.5-2.5-1.5-4 1.5-2.5 1.5-4-1.5-2-1.5-3.5 1.5-2.5 1.5-4-1.5-2.5-1.5-4"/><path d="M11.5 37.5s-2-1-2-3.5c0-2.5 2-3.5 2-3.5" strokeLinejoin="miter"/><path d="M33.5 37.5s2-1 2-3.5c0-2.5-2-3.5-2-3.5" strokeLinejoin="miter"/><path d="M14 14.5s-1.5 2.5-1.5 4"/><path d="M31 14.5s1.5 2.5 1.5 4"/></g></svg>,
    q: (p: {className?: string}) => <svg {...p} viewBox="0 0 45 45"><g fill="#000" stroke="#fff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M6 13l2 2-1 5 2-1 2 4-2 2 1 3h26l1-3-2-2 2-4-1 1 2-2-1-5 2-2-3-1-1 2-2-1-1-3-1 2-2-1h-1v-2h-2v2h-1l-2 1-1-2-1 3-2 1-1-2-3 1z"/><path d="M9 26c8.5-1.5 21.5-1.5 30 0l-3 13H12l-3-13z"/><path d="M11 26h26" fill="none"/></g></svg>,
    r: (p: {className?: string}) => <svg {...p} viewBox="0 0 45 45"><g fill="#000" stroke="#fff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M9 39h27v-3H9v3zM12 36v-4h21v4H12zM11 14V9h4v2h5V9h5v2h5V9h4v5" strokeLinejoin="miter"/><path d="M34 14l-3 3H14l-3-3"/><path d="M31 17v12.5H14V17" strokeLinejoin="miter"/><path d="M31 29.5l1.5 2.5H12.5L14 29.5"/><path d="M11 14h23" fill="none" strokeLinejoin="miter"/></g></svg>,
    b: (p: {className?: string}) => <svg {...p} viewBox="0 0 45 45"><g fill="#000" stroke="#fff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M9 36c3.39-.97 10.11.43 13.5-2 3.39 2.43 10.11 1.03 13.5 2 0 0 1.65.54 3 2-.68.97-1.65.99-3 .5-3.39-.97-10.11.43-13.5-2-3.39 2.43-10.11 1.03-13.5 2 0 0-1.65.54-3 2-.68.97-1.65.99-3-.5z"/><path d="M15 32c2.5 2.5 12.5 2.5 15 0 .5-1.5 0-2 0-2 0-2.5-2.5-4-2.5-4 5.5-1.5 6-11.5-5-15.5-11 4-10.5 14-5 15.5 0 0-2.5 1.5-2.5 4 0 0-.5.5 0 2zM25 8.5c-1.5-2-5-2-6.5 0-1 1.5-1 4.5-1 4.5-.5 3.5 2.5 6 2.5 6s3-2.5 2.5-6c0 0 .5-3-1-4.5z"/></g></svg>,
    n: (p: {className?: string}) => <svg {...p} viewBox="0 0 45 45"><g fill="#000" stroke="#fff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M22 10c10.5 1 11.5 8 11.5 10.5 0 2-1.5 4-4.5 4-2.5 0-4-1.5-4-4 0-2 1.5-3.5 1.5-6.5-1.5 1.5-3 3-4.5 5.5-1 2-2.5 3-2.5 5 0 2.5 2.5 4.5 2.5 4.5H10v-5c0-4.5 2-6.5 2-9.5-1-2-1-4-1-6 0-2.5 1.5-4 2.5-4s2 1.5 2 4-1 2.5-1 5c0 2.5 2.5 5 2.5 5"/><path d="M11.5 37c5.5 3.5 16.5 3.5 22 0v-7s-2 1.5-11 1.5-11-1.5-11-1.5v7zM11.5 30c5.5-3 16.5-3 22 0" strokeLinejoin="miter"/></g></svg>,
    p: (p: {className?: string}) => <svg {...p} viewBox="0 0 45 45"><g fill="#000" stroke="#fff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M22.5 9c-2.21 0-4 1.79-4 4 0 2.21 1.79 4 4 4s4-1.79 4-4-1.79-4-4-4zm0 9c-4.42 0-8 3.58-8 8s3.58 8 8 8 8-3.58 8-8-3.58-8-8-8zM12 39h21" fill="none"/></g></svg>
  }
};

export const ChessPiece: FC<ChessPieceProps> = ({ piece, className }) => {
  if (!piece) return null;
  const PieceComponent = pieceMap[piece.color][piece.type];
  if (!PieceComponent) return null;
  
  return <PieceComponent className={cn("w-full h-full p-1 drop-shadow-lg", className)} />;
};
