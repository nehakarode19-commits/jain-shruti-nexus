import { useState, useEffect, useRef, useCallback } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { Layout } from "@/components/layout/Layout";
import { PageBreadcrumb } from "@/components/ui/page-breadcrumb";
import { SimilarItems } from "@/components/ui/similar-items";
import { useBooksFromDB } from "@/hooks/useContent";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { SocialShareButtons } from "@/components/social/SocialShareButtons";
import { Progress } from "@/components/ui/progress";
import { 
  ArrowLeft, 
  Download, 
  ExternalLink, 
  BookOpen, 
  User, 
  Building2, 
  Globe, 
  Tag,
  Hash,
  Search,
  Loader2,
  FileText,
  Volume2,
  Volume1,
  VolumeX,
  Play,
  Pause,
  SkipBack,
  SkipForward,
  RotateCcw
} from "lucide-react";
import { Slider } from "@/components/ui/slider";

// Helper to format time as mm:ss
const formatTime = (seconds: number) => {
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${mins}:${secs.toString().padStart(2, '0')}`;
};

// LocalStorage key for audio progress
const getProgressKey = (bookId: string, langKey: string) => `audio_progress_${bookId}_${langKey}`;

const AUDIO_LANGUAGES = [
  { key: 'audio_hindi', label: 'Hindi', flag: '🇮🇳' },
  { key: 'audio_english', label: 'English', flag: '🇬🇧' },
  { key: 'audio_sanskrit', label: 'Sanskrit', flag: '📜' },
  { key: 'audio_prakrit', label: 'Prakrit', flag: '📖' },
  { key: 'audio_gujarati', label: 'Gujarati', flag: '🏛️' },
] as const;

const BookDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { data: books = [], isLoading } = useBooksFromDB();
  const [selectedAudioLang, setSelectedAudioLang] = useState<string | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(1);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  
  const book = books.find((b) => b.id === id);
  
  // Get similar books (same category, excluding current)
  const similarBooks = book 
    ? books.filter((b) => b.category === book.category && b.id !== book.id).slice(0, 4)
    : [];

  // Get available audio languages for this book
  const availableAudio = book ? AUDIO_LANGUAGES.filter(lang => 
    (book as any)[lang.key]
  ) : [];

  // Get saved progress for a specific language
  const getSavedProgress = useCallback((langKey: string) => {
    if (!id) return 0;
    const saved = localStorage.getItem(getProgressKey(id, langKey));
    return saved ? parseFloat(saved) : 0;
  }, [id]);

  // Save progress to localStorage
  const saveProgress = useCallback((langKey: string, time: number) => {
    if (!id) return;
    localStorage.setItem(getProgressKey(id, langKey), time.toString());
  }, [id]);

  // Cleanup audio on unmount
  useEffect(() => {
    return () => {
      if (audioRef.current) {
        // Save progress before unmount
        if (selectedAudioLang && currentTime > 0) {
          saveProgress(selectedAudioLang, currentTime);
        }
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, [selectedAudioLang, currentTime, saveProgress]);

  const handlePlayAudio = (audioUrl: string, langKey: string) => {
    // If clicking the same language that's playing, toggle play/pause
    if (selectedAudioLang === langKey && audioRef.current) {
      togglePlayPause();
      return;
    }

    // Save progress of current audio before switching
    if (audioRef.current && selectedAudioLang) {
      saveProgress(selectedAudioLang, audioRef.current.currentTime);
      audioRef.current.pause();
    }
    
    const audio = new Audio(audioUrl);
    const savedProgress = getSavedProgress(langKey);
    
    audio.onloadedmetadata = () => {
      setDuration(audio.duration);
      // Resume from saved position
      if (savedProgress > 0 && savedProgress < audio.duration - 1) {
        audio.currentTime = savedProgress;
      }
    };
    
    audio.ontimeupdate = () => {
      setCurrentTime(audio.currentTime);
      // Save progress every 5 seconds
      if (Math.floor(audio.currentTime) % 5 === 0) {
        saveProgress(langKey, audio.currentTime);
      }
    };
    
    audio.onended = () => {
      setIsPlaying(false);
      setCurrentTime(0);
      // Clear saved progress when finished
      if (id) localStorage.removeItem(getProgressKey(id, langKey));
    };
    
    audio.onpause = () => {
      saveProgress(langKey, audio.currentTime);
    };
    
    audio.play();
    audioRef.current = audio;
    setSelectedAudioLang(langKey);
    setIsPlaying(true);
  };

  const togglePlayPause = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handleSeek = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!audioRef.current || !duration) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const percent = (e.clientX - rect.left) / rect.width;
    const newTime = percent * duration;
    audioRef.current.currentTime = newTime;
    setCurrentTime(newTime);
  };

  const resetProgress = () => {
    if (audioRef.current && selectedAudioLang && id) {
      audioRef.current.currentTime = 0;
      setCurrentTime(0);
      localStorage.removeItem(getProgressKey(id, selectedAudioLang));
    }
  };

  const handleVolumeChange = (value: number[]) => {
    const newVolume = value[0];
    setVolume(newVolume);
    if (audioRef.current) {
      audioRef.current.volume = newVolume;
    }
  };

  const toggleMute = () => {
    if (audioRef.current) {
      if (volume > 0) {
        audioRef.current.volume = 0;
        setVolume(0);
      } else {
        audioRef.current.volume = 1;
        setVolume(1);
      }
    }
  };

  const VolumeIcon = volume === 0 ? VolumeX : volume < 0.5 ? Volume1 : Volume2;

  if (isLoading) {
    return (
      <Layout>
        <section className="py-20 bg-background">
          <div className="container mx-auto px-4 text-center">
            <Loader2 className="h-12 w-12 animate-spin text-primary mx-auto" />
            <p className="text-muted-foreground mt-4">Loading book details...</p>
          </div>
        </section>
      </Layout>
    );
  }

  if (!book) {
    return (
      <Layout>
        <section className="py-20 bg-background">
          <div className="container mx-auto px-4 text-center">
            <BookOpen className="h-16 w-16 text-muted-foreground/30 mx-auto mb-4" />
            <h1 className="font-heading text-2xl font-bold text-foreground mb-4">
              Book Not Found
            </h1>
            <p className="text-muted-foreground mb-6">
              The book you're looking for doesn't exist or has been removed.
            </p>
            <Button variant="hero" asChild>
              <Link to="/books">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Books
              </Link>
            </Button>
          </div>
        </section>
      </Layout>
    );
  }

  // Publisher default
  const publisher = "Shri Mahavira Jaina Vidyalaya";
  const hasPdf = !!book.pdf_url;
  const hasAudio = availableAudio.length > 0;

  return (
    <Layout>
      {/* Breadcrumb */}
      <PageBreadcrumb 
        items={[
          { label: "Books", href: "/books" },
          { label: book.title }
        ]}
      />

      {/* Book Details */}
      <section className="py-12 lg:py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-start">
            {/* Book Cover */}
            <div className="relative group">
              <div className="aspect-square max-w-md mx-auto lg:mx-0 bg-secondary/30 rounded-2xl overflow-hidden shadow-elegant">
                <img
                  src={book.cover_image || "https://siddhijambuparivar.com/wp-content/uploads/2022/11/96-min.jpg"}
                  alt={book.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              {/* Zoom icon overlay */}
              <div className="absolute top-4 right-4 bg-background/90 backdrop-blur-sm p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity">
                <Search className="h-5 w-5 text-foreground" />
              </div>
            </div>

            {/* Book Info */}
            <div className="space-y-6 animate-fade-up">
              <div>
                <h1 className="font-heading text-3xl lg:text-4xl font-bold text-foreground mb-4">
                  {book.title}
                </h1>
                
                <div className="space-y-3">
                  <div className="flex items-center gap-3 text-muted-foreground">
                    <User className="h-4 w-4 text-primary" />
                    <span className="text-sm font-body">
                      <span className="font-medium text-foreground">Author:</span> {book.author || "Gurudev Muni Jambuvijayaji"}
                    </span>
                  </div>
                  
                  <div className="flex items-center gap-3 text-muted-foreground">
                    <Building2 className="h-4 w-4 text-primary" />
                    <span className="text-sm font-body">
                      <span className="font-medium text-foreground">Publisher:</span> {publisher}
                    </span>
                  </div>

                  {book.year && (
                    <div className="flex items-center gap-3 text-muted-foreground">
                      <Hash className="h-4 w-4 text-primary" />
                      <span className="text-sm font-body">
                        <span className="font-medium text-foreground">Year:</span> {book.year}
                      </span>
                    </div>
                  )}
                </div>
              </div>

              {/* Feature Badges */}
              <div className="flex flex-wrap gap-2">
                {hasPdf && (
                  <Badge className="bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400 border-0">
                    <FileText className="h-3 w-3 mr-1" />
                    PDF Available
                  </Badge>
                )}
                {hasAudio && (
                  <Badge className="bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400 border-0">
                    <Volume2 className="h-3 w-3 mr-1" />
                    Audio Available ({availableAudio.length} languages)
                  </Badge>
                )}
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap gap-3">
                {hasPdf && (
                  <Button variant="hero" size="lg" asChild>
                    <a href={book.pdf_url!} target="_blank" rel="noopener noreferrer">
                      <Download className="h-4 w-4 mr-2" />
                      Download PDF
                    </a>
                  </Button>
                )}
                {!hasPdf && (
                  <Button variant="outline" size="lg" disabled>
                    <Download className="h-4 w-4 mr-2" />
                    PDF Not Available
                  </Button>
                )}
              </div>

              {/* Meta Info */}
              <div className="flex flex-wrap gap-4 pt-4 border-t border-border">
                {book.category && (
                  <div className="flex items-center gap-2">
                    <Tag className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm text-muted-foreground font-body">Category:</span>
                    <Badge variant="secondary">{book.category}</Badge>
                  </div>
                )}
                
                {book.language && (
                  <div className="flex items-center gap-2">
                    <Globe className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm text-muted-foreground font-body">Language:</span>
                  <Badge variant="outline">{book.language}</Badge>
                  </div>
                )}
              </div>
              
              {/* Share Buttons */}
              <div className="pt-4 border-t border-border mt-4">
                <SocialShareButtons 
                  title={book.title}
                  description={book.description || ''}
                  compact
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Audio Player Section */}
      {hasAudio && (
        <section className="py-10 bg-gradient-to-r from-purple-50 to-blue-50 dark:from-purple-900/20 dark:to-blue-900/20">
          <div className="container mx-auto px-4">
            <Card className="max-w-3xl mx-auto">
              <CardContent className="p-6">
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-3 rounded-full bg-primary/10">
                    <Volume2 className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-heading text-lg font-bold text-foreground">
                      Listen to this Book
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      Audio available in {availableAudio.length} language{availableAudio.length > 1 ? 's' : ''}
                    </p>
                  </div>
                </div>

                {/* Audio Language Selection */}
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3 mb-6">
                  {availableAudio.map(({ key, label, flag }) => {
                    const audioUrl = (book as any)[key];
                    const isSelected = selectedAudioLang === key;
                    const isCurrentPlaying = isSelected && isPlaying;
                    const hasSavedProgress = getSavedProgress(key) > 0;
                    
                    return (
                      <Button
                        key={key}
                        variant={isSelected ? "default" : "outline"}
                        className={`flex flex-col h-auto py-3 relative ${isCurrentPlaying ? 'ring-2 ring-primary ring-offset-2' : ''}`}
                        onClick={() => handlePlayAudio(audioUrl, key)}
                      >
                        {hasSavedProgress && !isSelected && (
                          <span className="absolute top-1 right-1 w-2 h-2 bg-primary rounded-full" title="Resume available" />
                        )}
                        <span className="text-lg mb-1">{flag}</span>
                        <span className="text-xs">{label}</span>
                        {isCurrentPlaying && (
                          <span className="text-[10px] mt-1 flex items-center gap-1">
                            <span className="w-1 h-1 bg-current rounded-full animate-pulse" />
                            Playing
                          </span>
                        )}
                        {hasSavedProgress && !isCurrentPlaying && (
                          <span className="text-[10px] mt-1 text-primary">Resume</span>
                        )}
                      </Button>
                    );
                  })}
                </div>

                {/* Audio Controls */}
                {selectedAudioLang && (
                  <div className="space-y-4">
                    {/* Progress Bar */}
                    <div className="space-y-2">
                      <div 
                        className="relative h-2 bg-secondary rounded-full cursor-pointer overflow-hidden"
                        onClick={handleSeek}
                      >
                        <div 
                          className="absolute inset-y-0 left-0 bg-primary rounded-full transition-all"
                          style={{ width: `${duration ? (currentTime / duration) * 100 : 0}%` }}
                        />
                      </div>
                      <div className="flex justify-between text-xs text-muted-foreground">
                        <span>{formatTime(currentTime)}</span>
                        <span>{formatTime(duration)}</span>
                      </div>
                    </div>

                    {/* Playback Controls */}
                    <div className="flex items-center justify-center gap-4 p-4 bg-secondary/50 rounded-lg">
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        onClick={resetProgress}
                        title="Reset to beginning"
                      >
                        <RotateCcw className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon" onClick={() => audioRef.current && (audioRef.current.currentTime -= 10)}>
                        <SkipBack className="h-5 w-5" />
                      </Button>
                      <Button 
                        size="lg" 
                        className="rounded-full w-14 h-14"
                        onClick={togglePlayPause}
                      >
                        {isPlaying ? (
                          <Pause className="h-6 w-6" />
                        ) : (
                          <Play className="h-6 w-6 ml-1" />
                        )}
                      </Button>
                      <Button variant="ghost" size="icon" onClick={() => audioRef.current && (audioRef.current.currentTime += 10)}>
                        <SkipForward className="h-5 w-5" />
                      </Button>
                    </div>

                    {/* Volume Control */}
                    <div className="flex items-center justify-center gap-3 px-4">
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        onClick={toggleMute}
                        className="h-8 w-8"
                        title={volume === 0 ? "Unmute" : "Mute"}
                      >
                        <VolumeIcon className="h-4 w-4" />
                      </Button>
                      <Slider
                        value={[volume]}
                        onValueChange={handleVolumeChange}
                        max={1}
                        step={0.01}
                        className="w-32"
                      />
                      <span className="text-xs text-muted-foreground w-8">
                        {Math.round(volume * 100)}%
                      </span>
                    </div>

                    {/* Resume indicator */}
                    {getSavedProgress(selectedAudioLang) > 0 && currentTime === 0 && !isPlaying && (
                      <p className="text-xs text-center text-primary">
                        Resume from {formatTime(getSavedProgress(selectedAudioLang))}
                      </p>
                    )}
                  </div>
                )}

                <p className="text-xs text-center text-muted-foreground mt-4">
                  {selectedAudioLang ? 'Click on the progress bar to seek' : 'Select a language above to start listening'}
                </p>
              </CardContent>
            </Card>
          </div>
        </section>
      )}

      {/* PDF Viewer Section */}
      {hasPdf && (
        <section className="py-10 bg-secondary/20">
          <div className="container mx-auto px-4">
            <div className="flex items-center gap-3 mb-6">
              <FileText className="h-6 w-6 text-primary" />
              <h2 className="font-heading text-xl font-bold text-foreground">
                Read Online
              </h2>
            </div>
            <div className="bg-background rounded-xl overflow-hidden shadow-lg border border-border">
              <iframe
                src={`${book.pdf_url}#toolbar=1&navpanes=0`}
                className="w-full h-[600px] lg:h-[800px]"
                title={`${book.title} - PDF Viewer`}
              />
            </div>
            <div className="mt-4 text-center">
              <Button variant="outline" asChild>
                <a href={book.pdf_url!} target="_blank" rel="noopener noreferrer">
                  <ExternalLink className="h-4 w-4 mr-2" />
                  Open in New Tab
                </a>
              </Button>
            </div>
          </div>
        </section>
      )}

      {/* Description */}
      <section className="py-10 bg-background">
        <div className="container mx-auto px-4">
          <h2 className="font-heading text-xl font-bold text-primary mb-4">
            Description
          </h2>
          <p className="text-muted-foreground leading-relaxed max-w-3xl font-body text-base">
            {book.description || `${book.title} - A scholarly work edited and published under the guidance of 
            Gurudev Muni Jambuvijayaji Maharaj Saheb. This text is part of the invaluable 
            collection of Jain scriptures preserved and made accessible through the 
            tireless efforts of Shri Mahavira Jaina Vidyalaya.`}
          </p>
        </div>
      </section>

      {/* Similar Products */}
      {similarBooks.length > 0 && (
        <SimilarItems
          title="Similar Books"
          subtitle="Explore More"
          items={similarBooks.map(b => ({
            id: b.id,
            title: b.title,
            image: b.cover_image || "https://siddhijambuparivar.com/wp-content/uploads/2022/11/96-min.jpg",
            category: b.category || "Book"
          }))}
          basePath="/books"
        />
      )}

      {/* CTA Section */}
      <section className="py-12 bg-secondary/30 border-t border-border">
        <div className="container mx-auto px-4 text-center">
          <p className="text-muted-foreground mb-4 font-body">
            Explore more sacred texts from Gurudev's collection
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button variant="hero" asChild>
              <Link to="/books">
                <BookOpen className="h-4 w-4 mr-2" />
                Browse All Books
              </Link>
            </Button>
            <Button variant="outline" asChild>
              <a
                href="https://siddhijambuparivar.com/shop/"
                target="_blank"
                rel="noopener noreferrer"
              >
                Visit Full Collection
                <ExternalLink className="h-4 w-4 ml-2" />
              </a>
            </Button>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default BookDetails;
