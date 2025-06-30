// NotificationTask.ts

type NotificationEvent = {
  notification: {
    packageName: string;
    title: string;
    text: string;
    subText?: string;
    // Jangan akses largeIcon atau smallIcon!
  };
};

const NotificationTask = async ({ notification }: NotificationEvent) => {
  const { packageName, title, text, subText } = notification;

  console.log('📥 Notifikasi Masuk');
  console.log('📦 App:', packageName);
  console.log('📝 Judul:', title);
  console.log('💬 Isi:', text);
  if (subText) console.log('🔹 SubText:', subText);

  // Di sini bisa simpan ke AsyncStorage, kirim ke server, dsb
};

export default NotificationTask;
