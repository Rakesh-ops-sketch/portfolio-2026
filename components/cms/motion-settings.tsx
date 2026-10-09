'use client';
import { MotionConfig } from 'motion/react';
import type { ReactNode } from 'react';
export function MotionSettings({reduced,children}:{reduced:boolean;children:ReactNode}){return <MotionConfig reducedMotion={reduced?'always':'user'}>{children}</MotionConfig>;}
