<?php
$field_name = $_POST['name'];
$field_email = $_POST['e-mail'];
$field_site = $_POST['web'];
$field_phone = $_POST['phone'];
$field_message = $_POST['message'];


// Validation mail
// Type your mail and the message that will be sent to everyone that contacts you
$your_name = 'Br0';
$your_mail = 'support@shindiristudio.com';
$your_message = 'This is a test auto response, please don\'t reply.';

$mail_to = $your_mail;
$subject = 'Mail from '.$field_name;

$body_message = 'From: '.$field_name."\n";
$body_message .= 'E-mail: '.$field_email."\n";
if ($field_phone && $field_phone != 'Phone') $body_message .= 'Phone: '.$field_email."\n";
if ($field_site && $field_site != 'Web') $body_message .= 'Site: '.$field_site."\n";
$body_message .= "\n".$field_message;

$headers = 'From: '.$field_name.'<'.$field_email.">\r\n";
$headers .= 'Reply-To: '.$field_email."\r\n";

$mail_status = mail($mail_to, $subject, $body_message, $headers);
 

if ($your_mail != '' && $your_message != '') {
	$subject_v = 'Message successfully sent!';

	$headers_v = 'From: '.$your_name.'<'.$your_mail.">\r\n";
	$headers_v .= 'Reply-To: '.$your_email."\r\n";

	$message_v = $your_message. "\n";

	mail($field_email, $subject_v, $message_v, $headers_v);
}
if ($mail_status) { ?>
	<script language="javascript" type="text/javascript">
		alert('Message successfully sent!');
		window.location = 'contact.html';
	</script>
<?php
}
else { ?>
	<script language="javascript" type="text/javascript">
		alert('Message sending faild! Please try again.');
		window.location = 'index.html#contact';
	</script>
<?php
}
?>