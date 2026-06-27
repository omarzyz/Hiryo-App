import { StyleSheet, Text, View } from "react-native";

type CommentCardProps = {
  initials: string;
  name: string;
  text: string;
};

export default function CommentCard({
  initials,
  name,
  text,
}: CommentCardProps) {
  return (
    <View style={styles.commentCard}>
      <View style={styles.commentHeader}>
        <View style={styles.commentAvatar}>
          <Text style={styles.commentAvatarText}>{initials}</Text>
        </View>

        <Text style={styles.commentName}>{name}</Text>
      </View>

      <Text style={styles.commentText}>{text}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  commentCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 14,
    padding: 14,
    borderWidth: 1,
    borderColor: "#E5E7EB",
    marginTop: 12,
  },

  commentHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },

  commentAvatar: {
    width: 34,
    height: 34,
    borderRadius: 17,
    backgroundColor: "#E0E7FF",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 9,
  },

  commentAvatarText: {
    fontSize: 12,
    fontWeight: "700",
    color: "#4338CA",
  },

  commentName: {
    fontSize: 14,
    fontWeight: "700",
    color: "#111827",
  },

  commentText: {
    fontSize: 15,
    color: "#475569",
    lineHeight: 22,
  },
});
