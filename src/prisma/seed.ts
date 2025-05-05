import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  try {
    // ユーザーデータのクリーンアップ（既存の場合）
    await prisma.post.deleteMany({});
    await prisma.user.deleteMany({});

    console.log('既存データをクリーンアップしました');

    // ユーザーの作成
    const user1 = await prisma.user.create({
      data: {
        name: '山田太郎',
        email: 'taro@example.com',
      },
    });

    const user2 = await prisma.user.create({
      data: {
        name: '佐藤花子',
        email: 'hanako@example.com',
      },
    });

    console.log('ユーザーを作成しました:', { user1, user2 });

    // 投稿の作成
    const post1 = await prisma.post.create({
      data: {
        title: 'Prismaの使い方',
        content: 'Prismaは次世代のORMで、TypeScriptとの相性が抜群です。',
        published: true,
        authorId: user1.id,
      },
    });

    const post2 = await prisma.post.create({
      data: {
        title: 'DockerとPostgreSQLの連携',
        content: 'Dockerを使用することで、簡単にPostgreSQLの環境を構築できます。',
        published: true,
        authorId: user1.id,
      },
    });

    const post3 = await prisma.post.create({
      data: {
        title: '下書き記事',
        content: 'これはまだ公開されていない記事です。',
        published: false,
        authorId: user2.id,
      },
    });

    console.log('投稿を作成しました:', { post1, post2, post3 });
  } catch (error) {
    console.error('シードの実行中にエラーが発生しました:', error);
    process.exit(1);
  } finally {
    // Prismaクライアントの切断
    await prisma.$disconnect();
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    // 最終的な切断
    await prisma.$disconnect();
  });