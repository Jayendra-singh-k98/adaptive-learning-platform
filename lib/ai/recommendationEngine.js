export function getNextTopic({ topics, progress }) {
  if (!topics || topics.length === 0) {
    return null;
  }

  // 1️⃣ No progress → first topic
  if (!progress || progress.length === 0) {
    return {
      topicId: topics[0]._id,
      reason: "Start with fundamentals",
    };
  }

  // 2️⃣ Last attempted topic
  const last = [...progress].sort(
    (a, b) => new Date(b.updatedAt) - new Date(a.updatedAt)
  )[0];

  // 3️⃣ Weak performance → revise same topic
  if ((last.score / (last.total || 1)) * 100 < 40) {
    return {
      topicId: last.topicId,
      reason: "Revise this topic to strengthen basics",
    };
  }

  // 4️⃣ Move to next topic
  const index = topics.findIndex(
    t => t._id.toString() === last.topicId.toString()
  );

  const nextTopic = topics[index + 1] || topics[index];

  return {
    topicId: nextTopic._id,
    reason: "You are ready to move ahead",
  };
}


export function getRecommendations({ topics, progress }) {
  if (!topics || topics.length === 0) return null;

  const completedTopicIds = new Set(
    (progress || []).filter(p => p.completed).map(p => p.topicId.toString())
  );

  // 🔹 Main recommendation
  let mainTopic = topics.find(t => !completedTopicIds.has(t._id.toString()))
    || topics[0];

  // 🔹 Alternative topics (exclude main + completed)
  const alternatives = topics
    .filter(t =>
      t._id.toString() !== mainTopic._id.toString() &&
      !completedTopicIds.has(t._id.toString())
    )
    .slice(0, 2); // only 2 suggestions

  return {
    mainTopicId: mainTopic._id,
    alternativeTopicIds: alternatives.map(t => t._id),
    reason: "Based on your recent performance and progress",
  };
}
