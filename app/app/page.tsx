'use client'

import React, { useRef, useState } from 'react';
import Image from 'next/image';

import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Accordion } from '@/components/ui/accordion';
import { ScrollArea } from '@/components/ui/scroll-area';
import { ModeToggle } from '@/components/mode-toggle';
import TextCustomizer from '@/components/editor/text-customizer';

import { PlusIcon, ReloadIcon } from '@radix-ui/react-icons';

import { removeBackground } from "@imgly/background-removal";

const Page = () => {
    const [selectedImage, setSelectedImage] = useState<string | null>(null);
    const [isImageSetupDone, setIsImageSetupDone] = useState<boolean>(false);
    const [removedBgImageUrl, setRemovedBgImageUrl] = useState<string | null>(null);
    const [textSets, setTextSets] = useState<Array<any>>([]);
    const fileInputRef = useRef<HTMLInputElement>(null);
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const previewContainerRef = useRef<HTMLDivElement>(null);
    const userId = "default";

    const handleUploadImage = () => {
        if (fileInputRef.current) {
            fileInputRef.current.click();
        }
    };

    const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            const imageUrl = URL.createObjectURL(file);
            setSelectedImage(imageUrl);
            await setupImage(imageUrl);
        }
    };

    const setupImage = async (imageUrl: string) => {
        try {
            const imageBlob = await removeBackground(imageUrl);
            const url = URL.createObjectURL(imageBlob);
            setRemovedBgImageUrl(url);
            setIsImageSetupDone(true);
        } catch (error) {
            console.error(error);
        }
    };

    const addNewTextSet = () => {
        const newId = Math.max(...textSets.map(set => set.id), 0) + 1;
        setTextSets(prev => [...prev, {
            id: newId,
            text: 'edit',
            fontFamily: 'Inter',
            top: 0,
            left: 0,
            color: 'white',
            fontSize: 200,
            fontWeight: 800,
            opacity: 1,
            shadowColor: 'rgba(0, 0, 0, 0.8)',
            shadowSize: 4,
            rotation: 0,
            tiltX: 0,
            tiltY: 0
        }]);
    };

    const handleAttributeChange = (id: number, attribute: string, value: any) => {
        setTextSets(prev => prev.map(set => 
            set.id === id ? { ...set, [attribute]: value } : set
        ));
    };

    const duplicateTextSet = (textSet: any) => {
        const newId = Math.max(...textSets.map(set => set.id), 0) + 1;
        setTextSets(prev => [...prev, { ...textSet, id: newId }]);
    };

    const removeTextSet = (id: number) => {
        setTextSets(prev => prev.filter(set => set.id !== id));
    };

    const calculateScaleFactor = (containerWidth: number, imageWidth: number) => {
        return containerWidth / 1000;
    };

    const getPreviewTextStyle = (textSet: any, scaleFactor: number): React.CSSProperties => ({
        position: 'absolute' as 'absolute', // TypeScript requires explicit narrowing
        top: `${50 - textSet.top}%`,
        left: `${textSet.left + 50}%`,
        transform: `
            translate(-50%, -50%) 
            rotate(${textSet.rotation}deg)
            perspective(1000px)
            rotateX(${textSet.tiltX}deg)
            rotateY(${textSet.tiltY}deg)
        `,
        color: textSet.color,
        textAlign: 'center' as 'center',
        fontSize: `${textSet.fontSize * scaleFactor}px`,
        fontWeight: textSet.fontWeight,
        fontFamily: textSet.fontFamily,
        opacity: textSet.opacity,
        transformStyle: 'preserve-3d' as 'preserve-3d',
    });
    

    const saveCompositeImage = () => {
        if (!canvasRef.current || !isImageSetupDone || !selectedImage) return;

        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        const tempImg = document.createElement('img');
        tempImg.crossOrigin = "anonymous";
        tempImg.src = selectedImage;
        tempImg.onload = () => {
            canvas.width = tempImg.width;
            canvas.height = tempImg.height;

            ctx.clearRect(0, 0, canvas.width, canvas.height);
            ctx.drawImage(tempImg, 0, 0, canvas.width, canvas.height);

            const previewWidth = previewContainerRef.current?.offsetWidth || 1000;
            const previewHeight = previewContainerRef.current?.offsetHeight || 600;
            const scaleX = canvas.width / previewWidth;
            const scaleY = canvas.height / previewHeight;
            const scaleFactor = Math.max(scaleX, scaleY);

            textSets.forEach(textSet => {
                ctx.save();
                
                const fontSize = textSet.fontSize * scaleFactor;
                ctx.font = `${textSet.fontWeight} ${fontSize}px ${textSet.fontFamily}`;
                ctx.fillStyle = textSet.color;
                ctx.globalAlpha = textSet.opacity;
                ctx.textAlign = 'center';
                ctx.textBaseline = 'middle';

                const x = canvas.width * (textSet.left + 50) / 100;
                const y = canvas.height * (50 - textSet.top) / 100;

                ctx.translate(x, y);
                
                const tiltXRad = (-textSet.tiltX * Math.PI) / 180;
                const tiltYRad = (-textSet.tiltY * Math.PI) / 180;
                
                ctx.transform(
                    Math.cos(tiltYRad),
                    Math.sin(tiltXRad),
                    -Math.sin(tiltYRad),
                    Math.cos(tiltXRad),
                    0,
                    0
                );

                ctx.rotate((textSet.rotation * Math.PI) / 180);
                ctx.fillText(textSet.text, 0, 0);
                ctx.restore();
            });

            if (removedBgImageUrl) {
                const removedBgImg = document.createElement('img');
                removedBgImg.crossOrigin = "anonymous";
                removedBgImg.src = removedBgImageUrl;
                removedBgImg.onload = () => {
                    ctx.drawImage(removedBgImg, 0, 0, canvas.width, canvas.height);
                    downloadImage();
                };
            } else {
                downloadImage();
            }
        };

        function downloadImage() {
            try {
                const dataUrl = canvas.toDataURL('image/png', 1.0);
                const link = document.createElement('a');
                link.download = 'text-behind-image.png';
                link.href = dataUrl;
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
            } catch (error) {
                console.error('Error saving image:', error);
            }
        }
    };

    return (
        <div className="min-h-screen bg-background">
            <div className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
                <div className="flex h-14 items-center px-4 gap-4">
                    <div className="flex flex-1 items-center gap-2">
                        <input
                            type="file"
                            ref={fileInputRef}
                            className="hidden"
                            onChange={handleFileChange}
                            accept=".jpg, .jpeg, .png"
                        />
                        <Button 
                            variant="outline" 
                            size="sm" 
                            onClick={handleUploadImage}
                        >
                            Upload image
                        </Button>
                        {selectedImage && (
                            <Button 
                                variant="secondary" 
                                size="sm" 
                                onClick={saveCompositeImage}
                            >
                                Save
                            </Button>
                        )}
                    </div>
                    <ModeToggle />
                </div>
            </div>

            {selectedImage ? (
                <div className="container mx-auto p-4">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div className="md:col-span-2">
                            <div 
                                ref={previewContainerRef}
                                className="relative aspect-video rounded-lg border bg-muted"
                            >
                                <canvas ref={canvasRef} className="hidden" />
                                {isImageSetupDone ? (
                                    <>
                                        <Image
                                            src={selectedImage}
                                            alt="Editor canvas"
                                            layout="fill"
                                            objectFit="contain"
                                            className="rounded-lg"
                                        />
                                        {textSets.map(textSet => {
                                            const scaleFactor = previewContainerRef.current 
                                                ? calculateScaleFactor(previewContainerRef.current.offsetWidth, 1000)
                                                : 1;
                                            return (
                                                <div
                                                    key={textSet.id}
                                                    style={getPreviewTextStyle(textSet, scaleFactor)}
                                                >
                                                    {textSet.text}
                                                </div>
                                            );
                                        })}
                                        {removedBgImageUrl && (
                                            <Image
                                                src={removedBgImageUrl}
                                                alt="Foreground"
                                                layout="fill"
                                                objectFit="contain"
                                                className="rounded-lg"
                                            />
                                        )}
                                    </>
                                ) : (
                                    <div className="absolute inset-0 flex items-center justify-center">
                                        <span className="flex items-center gap-2 text-sm text-muted-foreground">
                                            <ReloadIcon className="animate-spin h-4 w-4" /> 
                                            Processing image...
                                        </span>
                                    </div>
                                )}
                            </div>
                        </div>

                        <div className="space-y-4">
                            <div className="flex justify-between items-center">
                                <Button 
                                    onClick={addNewTextSet} 
                                    className="w-full"
                                    variant="secondary"
                                >
                                    <PlusIcon className="mr-2 h-4 w-4" /> Add Text Layer
                                </Button>
                            </div>
                            <ScrollArea className="h-[600px] rounded-lg border bg-card p-4">
                                <Accordion type="single" collapsible className="w-full">
                                    {textSets.map(textSet => (
                                        <TextCustomizer
                                            key={textSet.id}
                                            textSet={textSet}
                                            handleAttributeChange={handleAttributeChange}
                                            removeTextSet={removeTextSet}
                                            duplicateTextSet={duplicateTextSet}
                                        />
                                    ))}
                                </Accordion>
                            </ScrollArea>
                        </div>
                    </div>
                </div>
            ) : (
                <div className="flex items-center justify-center min-h-[calc(100vh-3.5rem)]">
                    <div className="text-center space-y-4">
                        <h2 className="text-2xl font-semibold tracking-tight">Text Behind Image Editor</h2>
                        <p className="text-muted-foreground">Upload an image to get started</p>
                        <Button
                            onClick={handleUploadImage}
                            size="lg"
                            className="gap-2"
                        >
                            Upload Image
                        </Button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Page;