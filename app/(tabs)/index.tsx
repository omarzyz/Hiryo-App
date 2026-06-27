import PostCard from "@/components/PostCard";
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { getPosts, getUserById, GorestPost } from "../../services/gorest";

type FeedPost = GorestPost & {
  name: string;
  initials: string;
};

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

export default function HomeScreen() {
  const router = useRouter();

  const [posts, setPosts] = useState<FeedPost[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");

  async function loadPosts() {
    try {
      setIsLoading(true);
      setErrorMessage("");

      const downloadedPosts = await getPosts();

      const postsWithAuthors = await Promise.all(
        downloadedPosts.map(async (post) => {
          let authorName = `User #${post.user_id}`;

          try {
            const user = await getUserById(post.user_id);
            authorName = user.name;
          } catch {
            // Some test posts may have authors that cannot be retrieved.
            // We keep the fallback name instead of leaving the card blank.
          }

          return {
            ...post,
            name: authorName,
            initials: getInitials(authorName),
          };
        }),
      );

      setPosts(postsWithAuthors);
    } catch {
      setErrorMessage(
        "Could not load posts. Check your internet connection and try again.",
      );
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    loadPosts();
  }, []);

  return (
    <View style={styles.screen}>
      <View style={styles.header}>
        <Text style={styles.appName}>Hiryo</Text>
        <Text style={styles.pageTitle}>Your social space</Text>
      </View>
      {isLoading ? (
        <View style={styles.centerState}>
          <ActivityIndicator size="large" color="#2563EB" />
          <Text style={styles.stateText}>Loading community posts...</Text>
        </View>
      ) : errorMessage !== "" ? (
        <View style={styles.centerState}>
          <Text style={styles.errorTitle}>Something went wrong</Text>

          <Text style={styles.errorText}>{errorMessage}</Text>

          <Pressable style={styles.retryButton} onPress={loadPosts}>
            <Text style={styles.retryButtonText}>Try again</Text>
          </Pressable>
        </View>
      ) : (
        <ScrollView
          contentContainerStyle={styles.feedArea}
          showsVerticalScrollIndicator={false}
        >
          <Text style={styles.sectionTitle}>Latest posts</Text>

          {posts.map((post) => (
            <PostCard
              key={post.id}
              initials={post.initials}
              name={post.name}
              time="Community post"
              title={post.title}
              body={post.body}
              onPress={() =>
                router.push({
                  pathname: "/post/[id]",
                  params: { id: post.id.toString() },
                })
              }
            />
          ))}
        </ScrollView>
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

  appName: {
    fontSize: 28,
    fontWeight: "800",
    color: "#2563EB",
  },

  pageTitle: {
    fontSize: 15,
    color: "#64748B",
    marginTop: 3,
  },

  feedArea: {
    paddingBottom: 32,
    padding: 20,
  },

  sectionTitle: {
    fontSize: 20,
    fontWeight: "700",
    color: "#111827",
    marginBottom: 14,
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
