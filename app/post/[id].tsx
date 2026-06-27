import { useLocalSearchParams, useRouter } from "expo-router";
import { useEffect, useState } from "react";
import {
    ActivityIndicator,
    Pressable,
    ScrollView,
    StyleSheet,
    Text,
    View,
} from "react-native";
import CommentCard from "../../components/CommentCard";
import {
    getCommentsByPostId,
    getPostById,
    GorestComment,
    GorestPost,
} from "../../services/gorest";

export default function PostDetailsScreen() {
  const router = useRouter();

  const { id } = useLocalSearchParams();

  const postId = typeof id === "string" ? id : "";

  const [post, setPost] = useState<GorestPost | null>(null);
  const [authorName, setAuthorName] = useState("");
  const [comments, setComments] = useState<GorestComment[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");

  async function loadPostDetails() {
    if (postId === "") {
      setErrorMessage("This post does not have a valid ID.");
      setIsLoading(false);
      return;
    }

    try {
      setIsLoading(true);
      setErrorMessage("");
      setPost(null);
      setComments([]);
      setAuthorName("");

      const downloadedPost = await getPostById(postId);

      const downloadedComments = await getCommentsByPostId(postId);

      let resolvedAuthorName = `User #${downloadedPost.user_id}`;

      try {
        const downloadedAuthor = await getUserById(downloadedPost.user_id);

        resolvedAuthorName = downloadedAuthor.name;
      } catch {
        // Keep the fallback author name if the user request fails.
      }

      setPost(downloadedPost);
      setComments(downloadedComments);
      setAuthorName(resolvedAuthorName);
    } catch {
      setErrorMessage(
        "Could not load this post. Check your internet connection and try again.",
      );
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    loadPostDetails();
  }, [postId]);

  function getInitials(name: string) {
    const initials = name
      .trim()
      .split(" ")
      .filter(Boolean)
      .map((word) => word[0])
      .join("")
      .slice(0, 2)
      .toUpperCase();

    return initials || "U";
  }

  function getCommentInitials(name: string) {
    return name
      .trim()
      .split(" ")
      .map((word) => word[0])
      .join("")
      .slice(0, 2)
      .toUpperCase();
  }

  return (
    <View style={styles.screen}>
      <View style={styles.header}>
        <Pressable style={styles.backButton} onPress={() => router.back()}>
          <Text style={styles.backButtonText}>← Back</Text>
        </Pressable>

        <Text style={styles.headerTitle}>Post details</Text>
      </View>

      {isLoading ? (
        <View style={styles.centerState}>
          <ActivityIndicator size="large" color="#2563EB" />
          <Text style={styles.stateText}>Loading post...</Text>
        </View>
      ) : errorMessage !== "" ? (
        <View style={styles.centerState}>
          <Text style={styles.errorTitle}>Something went wrong</Text>

          <Text style={styles.errorText}>{errorMessage}</Text>

          <Pressable style={styles.retryButton} onPress={loadPostDetails}>
            <Text style={styles.retryButtonText}>Try again</Text>
          </Pressable>
        </View>
      ) : post ? (
        <ScrollView contentContainerStyle={styles.content}>
          <View style={styles.postCard}>
            <View style={styles.profileRow}>
              <View style={styles.avatar}>
                <Text style={styles.avatarText}>{getInitials(authorName)}</Text>
              </View>

              <View>
                <Text style={styles.userName}>{authorName}</Text>
                <Text style={styles.postTime}>Community post</Text>
              </View>
            </View>

            <Text style={styles.postTitle}>{post.title}</Text>

            <Text style={styles.postBody}>{post.body}</Text>
          </View>

          <View style={styles.commentsSection}>
            <Text style={styles.commentsTitle}>
              Comments ({comments.length})
            </Text>

            {comments.length === 0 ? (
              <Text style={styles.commentsMessage}>
                No comments yet for this post.
              </Text>
            ) : (
              comments.map((comment) => (
                <CommentCard
                  key={comment.id}
                  initials={getCommentInitials(comment.name)}
                  name={comment.name}
                  text={comment.body}
                />
              ))
            )}
          </View>
        </ScrollView>
      ) : (
        <View style={styles.centerState}>
          <Text style={styles.errorTitle}>Post not found</Text>

          <Text style={styles.errorText}>
            This post could not be displayed.
          </Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "#F5F7FB",
  },

  header: {
    backgroundColor: "#FFFFFF",
    paddingHorizontal: 20,
    paddingTop: 22,
    paddingBottom: 18,
    borderBottomWidth: 1,
    borderBottomColor: "#E5E7EB",
  },

  backButton: {
    alignSelf: "flex-start",
    marginBottom: 14,
  },

  backButtonText: {
    fontSize: 16,
    fontWeight: "700",
    color: "#2563EB",
  },

  headerTitle: {
    fontSize: 24,
    fontWeight: "800",
    color: "#111827",
  },

  content: {
    padding: 20,
    paddingBottom: 32,
  },

  postCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: "#E5E7EB",
  },

  profileRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
  },

  avatar: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: "#DBEAFE",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 10,
  },

  avatarText: {
    fontSize: 14,
    fontWeight: "700",
    color: "#2563EB",
  },

  userName: {
    fontSize: 15,
    fontWeight: "700",
    color: "#111827",
  },

  postTime: {
    fontSize: 13,
    color: "#64748B",
    marginTop: 2,
  },

  postTitle: {
    fontSize: 22,
    fontWeight: "800",
    color: "#111827",
    lineHeight: 30,
    marginBottom: 12,
  },

  postBody: {
    fontSize: 16,
    color: "#475569",
    lineHeight: 25,
  },

  commentsSection: {
    marginTop: 24,
  },

  commentsTitle: {
    fontSize: 20,
    fontWeight: "800",
    color: "#111827",
    marginBottom: 8,
  },

  commentsMessage: {
    fontSize: 15,
    color: "#64748B",
    lineHeight: 22,
  },

  centerState: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 30,
  },

  stateText: {
    marginTop: 14,
    fontSize: 16,
    color: "#64748B",
  },

  errorTitle: {
    fontSize: 20,
    fontWeight: "800",
    color: "#111827",
    marginBottom: 8,
  },

  errorText: {
    fontSize: 16,
    color: "#64748B",
    textAlign: "center",
    lineHeight: 23,
  },

  retryButton: {
    marginTop: 20,
    backgroundColor: "#2563EB",
    paddingHorizontal: 18,
    paddingVertical: 12,
    borderRadius: 10,
  },

  retryButtonText: {
    color: "#FFFFFF",
    fontSize: 15,
    fontWeight: "700",
  },
});
