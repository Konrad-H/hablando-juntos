<?php $name = $_POST['name'];
$email = $_POST['email'];
$phone = $_POST['phone'];
$message = $_POST['message'];
$formcontent="From: $name  \n Message: $message \n Phone: $phone" ;
$recipient = "bisaez@uc.cl";
$subject = "[Hablando Juntos] Contacto - $name";
$mailheader = "From: $email \r\n";
mail($recipient, $subject, $formcontent, $mailheader) or die("Error, auxilio!");
echo "Gracias!";
?>