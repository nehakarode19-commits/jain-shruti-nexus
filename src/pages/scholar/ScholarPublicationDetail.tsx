import { useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { ScholarLayout } from "@/components/scholar/ScholarLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { CitationGenerator } from "@/components/scholar/CitationGenerator";
import {
  FileText,
  ArrowLeft,
  Calendar,
  Eye,
  Download,
  Share2,
  Star,
  ExternalLink,
  User,
  MessageSquare,
  Loader2,
  BookOpen
} from "lucide-react";
import { usePublication, usePublicationReviews, useSubmitReview } from "@/hooks/useScholarPublications";
import { format } from "date-fns";

const ScholarPublicationDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { data: publication, isLoading } = usePublication(id || "");
  const { data: reviews = [] } = usePublicationReviews(id || "");
  const submitReview = useSubmitReview();

  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [isSubmittingReview, setIsSubmittingReview] = useState(false);

  const handleSubmitReview = async () => {
    if (!id || rating === 0) return;
    
    setIsSubmittingReview(true);
    try {
      await submitReview.mutateAsync({
        publication_id: id,
        rating,
        comment,
      });
      setRating(0);
      setComment("");
    } finally {
      setIsSubmittingReview(false);
    }
  };

  if (isLoading) {
    return (
      <ScholarLayout title="Loading...">
        <div className="flex items-center justify-center py-16">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
      </ScholarLayout>
    );
  }

  if (!publication) {
    return (
      <ScholarLayout title="Publication Not Found">
        <Card variant="feature">
          <CardContent className="py-16 text-center">
            <FileText className="h-16 w-16 text-muted-foreground/30 mx-auto mb-4" />
            <h3 className="font-heading text-xl font-semibold mb-2">Publication not found</h3>
            <p className="text-muted-foreground mb-6">
              The publication you're looking for doesn't exist or has been removed.
            </p>
            <Button variant="hero" onClick={() => navigate("/scholar/publications")}>
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Publications
            </Button>
          </CardContent>
        </Card>
      </ScholarLayout>
    );
  }

  const averageRating = reviews.length > 0
    ? (reviews.reduce((sum, r) => sum + (r.rating || 0), 0) / reviews.length).toFixed(1)
    : "N/A";

  return (
    <ScholarLayout title={publication.title}>
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Back Button */}
        <Button variant="ghost" onClick={() => navigate("/scholar/publications")}>
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Publications
        </Button>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Header Card */}
            <Card variant="feature">
              <CardContent className="p-6">
                <div className="flex gap-6">
                  {publication.cover_image ? (
                    <img
                      src={publication.cover_image}
                      alt={publication.title}
                      className="w-32 h-44 object-cover rounded-lg flex-shrink-0"
                    />
                  ) : (
                    <div className="w-32 h-44 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                      <BookOpen className="h-12 w-12 text-primary" />
                    </div>
                  )}
                  <div className="flex-1">
                    <div className="flex flex-wrap gap-2 mb-3">
                      <Badge variant="secondary">{publication.category}</Badge>
                      {publication.sub_category && (
                        <Badge variant="outline">{publication.sub_category}</Badge>
                      )}
                    </div>
                    <h1 className="font-heading text-2xl font-bold text-foreground mb-4">
                      {publication.title}
                    </h1>
                    <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                      {publication.published_at && (
                        <span className="flex items-center gap-1">
                          <Calendar className="h-4 w-4" />
                          {format(new Date(publication.published_at), "MMMM d, yyyy")}
                        </span>
                      )}
                      <span className="flex items-center gap-1">
                        <Eye className="h-4 w-4" />
                        {publication.views_count} views
                      </span>
                      <span className="flex items-center gap-1">
                        <Download className="h-4 w-4" />
                        {publication.downloads_count} downloads
                      </span>
                      {reviews.length > 0 && (
                        <span className="flex items-center gap-1">
                          <Star className="h-4 w-4 text-yellow-500 fill-yellow-500" />
                          {averageRating} ({reviews.length} reviews)
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Abstract */}
            <Card variant="feature">
              <CardHeader>
                <CardTitle>Abstract</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground leading-relaxed whitespace-pre-wrap">
                  {publication.abstract || "No abstract available."}
                </p>
              </CardContent>
            </Card>

            {/* Full Content */}
            {publication.content && (
              <Card variant="feature">
                <CardHeader>
                  <CardTitle>Full Content</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="prose prose-sm max-w-none text-muted-foreground">
                    <p className="whitespace-pre-wrap">{publication.content}</p>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Reviews Section */}
            <Card variant="feature">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MessageSquare className="h-5 w-5" />
                  Reviews ({reviews.length})
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Submit Review */}
                <div className="space-y-4 pb-6 border-b">
                  <h4 className="font-medium">Leave a Review</h4>
                  <div className="flex gap-1">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        onClick={() => setRating(star)}
                        className="p-1 hover:scale-110 transition-transform"
                      >
                        <Star
                          className={`h-6 w-6 ${
                            star <= rating
                              ? "text-yellow-500 fill-yellow-500"
                              : "text-gray-300"
                          }`}
                        />
                      </button>
                    ))}
                  </div>
                  <Textarea
                    placeholder="Share your thoughts about this publication..."
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    rows={3}
                  />
                  <Button
                    variant="hero"
                    onClick={handleSubmitReview}
                    disabled={rating === 0 || isSubmittingReview}
                  >
                    {isSubmittingReview ? (
                      <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                    ) : (
                      <MessageSquare className="h-4 w-4 mr-2" />
                    )}
                    Submit Review
                  </Button>
                </div>

                {/* Reviews List */}
                {reviews.length === 0 ? (
                  <p className="text-muted-foreground text-center py-4">
                    No reviews yet. Be the first to review!
                  </p>
                ) : (
                  <div className="space-y-4">
                    {reviews.map((review) => (
                      <div key={review.id} className="flex gap-4 pb-4 border-b last:border-0">
                        <Avatar>
                          <AvatarFallback className="bg-primary/10 text-primary">
                            <User className="h-4 w-4" />
                          </AvatarFallback>
                        </Avatar>
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <span className="font-medium text-sm">Scholar</span>
                            <div className="flex gap-0.5">
                              {[1, 2, 3, 4, 5].map((star) => (
                                <Star
                                  key={star}
                                  className={`h-3 w-3 ${
                                    star <= (review.rating || 0)
                                      ? "text-yellow-500 fill-yellow-500"
                                      : "text-gray-300"
                                  }`}
                                />
                              ))}
                            </div>
                            <span className="text-xs text-muted-foreground">
                              {format(new Date(review.created_at), "MMM d, yyyy")}
                            </span>
                          </div>
                          <p className="text-sm text-muted-foreground">{review.comment}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Right Column - Sidebar */}
          <div className="space-y-6">
            {/* Actions */}
            <Card variant="feature">
              <CardContent className="p-4 space-y-3">
                {publication.file_url && (
                  <Button variant="hero" className="w-full" asChild>
                    <a href={publication.file_url} target="_blank" rel="noopener noreferrer">
                      <Download className="h-4 w-4 mr-2" />
                      Download PDF
                    </a>
                  </Button>
                )}
                <Button variant="outline" className="w-full">
                  <Share2 className="h-4 w-4 mr-2" />
                  Share
                </Button>
              </CardContent>
            </Card>

            {/* Keywords */}
            {publication.keywords && publication.keywords.length > 0 && (
              <Card variant="feature">
                <CardHeader>
                  <CardTitle className="text-sm">Keywords</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {publication.keywords.map((keyword, i) => (
                      <Badge key={i} variant="secondary" className="text-xs">
                        {keyword}
                    </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Citation Generator */}
            <CitationGenerator publication={publication} />

            {/* Stats */}
            <Card variant="feature">
              <CardHeader>
                <CardTitle className="text-sm">Statistics</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Views</span>
                  <span className="font-medium">{publication.views_count}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Downloads</span>
                  <span className="font-medium">{publication.downloads_count}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Reviews</span>
                  <span className="font-medium">{reviews.length}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Rating</span>
                  <span className="font-medium flex items-center gap-1">
                    <Star className="h-4 w-4 text-yellow-500 fill-yellow-500" />
                    {averageRating}
                  </span>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </ScholarLayout>
  );
};

export default ScholarPublicationDetail;
