<?php
  $username = "admin"; // Yönetici kullanıcı adı
  $password = "password123"; // Yönetici şifresi

  if ($_POST["username"] == $username && $_POST["password"] == $password) {
    header("Location: admin-panel.php"); // Doğru bilgiler girildiğinde yönetim paneline yönlendir
    exit();
  } else {
    echo "Kullanıcı adı veya şifre yanlış"; // Yanlış bilgi girildiğinde hata mesajı göster
  }
?>
