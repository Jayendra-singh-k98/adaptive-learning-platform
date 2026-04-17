import connectDB from "@/db/connectdb";
import StudentTopicProgress from "@/db/models/StudentTopicProgress";
import Topic from "@/db/models/Topic";

async function updateExistingProgress() {
  try {
    await connectDB();

    // Find all progress records that don't have topicName
    const progressRecords = await StudentTopicProgress.find({ topicName: { $exists: false } });

    console.log(`Found ${progressRecords.length} records to update`);

    for (const record of progressRecords) {
      const topic = await Topic.findById(record.topicId);
      if (topic) {
        await StudentTopicProgress.updateOne(
          { _id: record._id },
          { $set: { topicName: topic.title } }
        );
        console.log(`Updated record for topic: ${topic.title}`);
      } else {
        console.log(`Topic not found for ID: ${record.topicId}`);
      }
    }

    console.log("Update complete");
    process.exit(0);
  } catch (error) {
    console.error("Error updating progress:", error);
    process.exit(1);
  }
}

updateExistingProgress();