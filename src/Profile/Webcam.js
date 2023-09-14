import React, { useState, useRef } from 'react';

const WebcamComponent = () => {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const [stream, setStream] = useState(null);

  const handleButtonClick = async () => {
    try {
      const mediaStream = await navigator.mediaDevices.getUserMedia({ video: true });
      setStream(mediaStream);
      videoRef.current.srcObject = mediaStream;
      startCapture();
    } catch (error) {
      console.error('Error accessing webcam:', error);
    }
  };
  const intervalRef = useRef(null);
  const startCapture = () => {
    intervalRef.current = setInterval(() => {
      if (videoRef.current && canvasRef.current) {
        const video = videoRef.current;
        const canvas = canvasRef.current;
        const context = canvas.getContext('2d');
        context.drawImage(video, 0, 0, canvas.width, canvas.height);
        const screenshot = canvas.toDataURL('image/png');
        console.log('Screenshot taken:', screenshot);
      }
    }, 5000);
  };

  
  
  
  

  const handleStopButtonClick = () => {
    if (stream) {
      stream.getTracks().forEach(track => track.stop());
      setStream(null);
    }
    clearInterval(intervalRef.current);
  };

  return (
    <div>
      <button onClick={handleButtonClick}>Start Webcam</button>
      <button onClick={handleStopButtonClick}>Stop Webcam</button>
      <br />
      <video ref={videoRef} autoPlay playsInline muted />
      <canvas ref={canvasRef} style={{ display: 'none' }} />
    </div>
  );
};

export default WebcamComponent;
