<?php
    if (!empty($_POST['email']))
    {
        $sEmail = $_POST['email'];
    }
    else
    {
        throw new Exception("Error email field is empty", 1);
    }

    if (!empty($_POST['subject']))
    {
        $sSubject = $_POST['subject'];
    }
    else
    {
        throw new Exception("Error subject field is empty", 1);
    }

    if (!empty($_POST['message']))
    {
        $sMessage = $_POST['message'];
    }
    else
    {
        throw new Exception("Error message field is empty", 1);
    }

    $sHeaders = 'From: ' . $sEmail . "\r\n" .
     'Reply-To: ' . $sEmail . "\r\n" .
     'X-Mailer: PHP/' . phpversion();

    mail (
        'alexandre.givern@gmail.com'
        'WebSite - ' . $sSubject,
        $sMessage,
        $sHeaders
    );

