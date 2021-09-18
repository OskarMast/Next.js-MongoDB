import { nanoid } from 'nanoid';

export async function findPostById(db, id) {
  return db.collection('posts').findOne({ _id: id });
}

export async function findPosts(db, from, by, limit = 10) {
  return db
    .collection('posts')
    .find({
      // Pagination: Fetch posts from before the input date or fetch from newest
      ...(from && {
        createdAt: {
          $lte: from,
        },
      }),
      ...(by && { creatorId: by }),
    })
    .sort({ $natural: -1 })
    .limit(limit)
    .toArray();
}

export async function insertPost(db, { content, creatorId }) {
  const post = {
    _id: nanoid(12),
    content,
    creatorId,
    createdAt: new Date(),
  };
  await db.collection('posts').insertOne(post);
  return post;
}
