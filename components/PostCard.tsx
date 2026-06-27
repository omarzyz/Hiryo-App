import { Pressable, StyleSheet, Text, View } from "react-native";

type PostCardProps = {
  initials: string;
  name: string;
  time: string;
  title: string;
  body: string;
  onPress: () => void;
};

export default function PostCard({
  initials,
  name,
  time,
  title,
  body,
  onPress,
}: PostCardProps) {
  return (
    <Pressable style={styles.postCard} onPress={onPress}>
      <View style={styles.profileRow}>
        <View style={styles.avatar}>
          <Text style={styles.avatarText}>{initials}</Text>
        </View>

        <View>
          <Text style={styles.userName}>{name}</Text>
          <Text style={styles.postTime}>{time}</Text>
        </View>
      </View>

      <Text style={styles.postTitle}>{title}</Text>

      <Text style={styles.postBody}>{body}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  postCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: "#E5E7EB",
    marginBottom: 14,
  },

  profileRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 14,
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
    fontSize: 18,
    fontWeight: "700",
    color: "#111827",
    marginBottom: 8,
  },

  postBody: {
    fontSize: 15,
    color: "#475569",
    lineHeight: 22,
  },
});
