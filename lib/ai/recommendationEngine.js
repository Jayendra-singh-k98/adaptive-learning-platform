export function getRecommendations({ topics, progress }) {
  if (!topics || topics.length === 0) return null;

  if (!progress || progress.length === 0) {
    return {
      mainTopicId: topics[0]._id,
      alternativeTopicIds: [],
      reason: "Start with fundamentals",
      level: "Weak",
      accuracy: 0,
      predicted: 0,
    };
  }

  // 🔥 STEP 1 — Find Weak / Improving topics
  const weakTopics = progress.filter(p => p.level === "Weak");
  const improvingTopics = progress.filter(p => p.level === "Improving");

  let selected;

  // 🔴 PRIORITY 1 — Weak
  if (weakTopics.length > 0) {
    selected = weakTopics.sort((a, b) => a.accuracy - b.accuracy)[0];

    return {
      mainTopicId: selected.topicId,
      alternativeTopicIds: [],
      reason: "You need to improve weak areas",
      level: selected.level,
      accuracy: selected.accuracy,
      predicted: selected.predicted,
    };
  }

  // 🟡 PRIORITY 2 — Improving
  if (improvingTopics.length > 0) {
    selected = improvingTopics.sort((a, b) => a.accuracy - b.accuracy)[0];

    return {
      mainTopicId: selected.topicId,
      alternativeTopicIds: [],
      reason: "You are improving — continue practicing",
      level: selected.level,
      accuracy: selected.accuracy,
      predicted: selected.predicted,
    };
  }

  // 🟢 PRIORITY 3 — Move forward (Strong topics)
  const completedTopicIds = new Set(
    progress.filter(p => p.completed).map(p => p.topicId.toString())
  );

  const nextTopic =
    topics.find(t => !completedTopicIds.has(t._id.toString())) || topics[0];


    

  return {
    mainTopicId: nextTopic._id,
    alternativeTopicIds: [],
    reason: "You are ready to move ahead",
    level: "Strong",
    accuracy: 80,
    predicted: 70,
  };
}