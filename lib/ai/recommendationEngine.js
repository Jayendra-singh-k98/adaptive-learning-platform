// lib/ai/recommendationEngine.js

export function getNextTopic({ topics, progress }) {
  if (!topics || topics.length === 0) {
    return null;
  }

  if (!progress || progress.length === 0) {
    return {
      topic: topics[0],
      reason: "Start with fundamentals"
    };
  }

  const last = progress.sort(
    (a, b) => new Date(b.updatedAt) - new Date(a.updatedAt)
  )[0];

  if (last.score < 40) {
    return {
      topic: last.topicId,
      reason: "Revise this topic to strengthen basics"
    };
  }

  const index = topics.findIndex(
    t => t._id.toString() === last.topicId.toString()
  );

  return {
    topic: topics[index + 1] || topics[index],
    reason: "You are ready to move ahead"
  };
}
