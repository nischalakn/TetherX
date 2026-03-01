import { useState, useEffect, useRef } from "react";
import { Mic, MicOff, Trash2, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

interface VoiceRecorderProps {
  onRecordingComplete: (blob: Blob) => void;
  onRecordingClear?: () => void;
  hasRecording?: boolean;
}

export const VoiceRecorder = ({ onRecordingComplete, onRecordingClear, hasRecording }: VoiceRecorderProps) => {
  const { toast } = useToast();
  const [isRecording, setIsRecording] = useState(false);
  const [seconds, setSeconds] = useState(0);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    if (isRecording) {
      timerRef.current = setInterval(() => setSeconds((s) => s + 1), 1000);
    } else {
      if (timerRef.current) clearInterval(timerRef.current);
    }
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isRecording]);

  const formatTime = (s: number) => {
    const m = Math.floor(s / 60).toString().padStart(2, "0");
    const sec = (s % 60).toString().padStart(2, "0");
    return `${m}:${sec}`;
  };

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const recorder = new MediaRecorder(stream);
      const chunks: BlobPart[] = [];
      recorder.ondataavailable = (e) => chunks.push(e.data);
      recorder.onstop = () => {
        const blob = new Blob(chunks, { type: "audio/webm" });
        onRecordingComplete(blob);
        stream.getTracks().forEach((t) => t.stop());
      };
      recorder.start();
      mediaRecorderRef.current = recorder;
      setSeconds(0);
      setIsRecording(true);
    } catch {
      toast({
        title: "Microphone Blocked",
        description: "Please allow microphone access in your browser settings.",
        variant: "destructive",
      });
    }
  };

  const stopRecording = () => {
    mediaRecorderRef.current?.stop();
    setIsRecording(false);
    toast({ title: "Voice Note Saved", description: "Your voice note has been attached." });
  };

  const clearRecording = () => {
    setSeconds(0);
    onRecordingClear?.();
    toast({ title: "Voice Note Removed", description: "Recording cleared." });
  };

  /* --- Recording state UI --- */
  if (isRecording) {
    return (
      <div className="flex items-center gap-3 rounded-xl border border-destructive/30 bg-destructive/5 px-4 py-3">
        {/* Pulsing red dot */}
        <span className="relative flex h-3 w-3 shrink-0">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-destructive opacity-60" />
          <span className="relative inline-flex h-3 w-3 rounded-full bg-destructive" />
        </span>

        {/* Waveform bars */}
        <div className="flex items-end gap-[3px] text-destructive" aria-hidden>
          {Array.from({ length: 10 }).map((_, i) => (
            <span key={i} className="wave-bar" />
          ))}
        </div>

        {/* Timer */}
        <span className="min-w-[38px] font-mono text-sm font-semibold text-destructive">
          {formatTime(seconds)}
        </span>

        {/* Stop button */}
        <Button
          type="button"
          size="sm"
          variant="destructive"
          className="ml-auto"
          onClick={stopRecording}
        >
          <MicOff className="mr-1.5 h-4 w-4" />
          Stop
        </Button>
      </div>
    );
  }

  /* --- Recorded state UI --- */
  if (hasRecording) {
    return (
      <div className="flex items-center gap-3 rounded-xl border border-primary/30 bg-primary/5 px-4 py-3">
        <CheckCircle className="h-5 w-5 shrink-0 text-primary" />
        <span className="text-sm font-medium text-primary">Voice note attached</span>
        <div className="ml-auto flex items-center gap-2">
          <Button type="button" size="sm" variant="outline" onClick={startRecording}>
            <Mic className="mr-1.5 h-4 w-4" />
            Re-record
          </Button>
          <Button type="button" size="sm" variant="ghost" onClick={clearRecording}>
            <Trash2 className="h-4 w-4 text-muted-foreground" />
          </Button>
        </div>
      </div>
    );
  }

  /* --- Default (idle) state UI --- */
  return (
    <Button type="button" variant="outline" onClick={startRecording}>
      <Mic className="mr-2 h-4 w-4" />
      Record Voice Note
    </Button>
  );
};

export default VoiceRecorder;
