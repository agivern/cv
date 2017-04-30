<?php
    include 'config/config.php';
    require 'vendor/PHPMailer/PHPMailerAutoload.php';

    try {
        if (!empty($_POST['email']))
        {
            $sEmail = $_POST['email'];
        }
        else
        {
            throw new Exception('Error email field is empty');
        }

        if (!empty($_POST['subject']))
        {
            $sSubject = 'CV Website - ';
            $sSubject .= $_POST['subject'];
        }
        else
        {
            throw new Exception('Error subject field is empty');
        }

        if (!empty($_POST['message']))
        {
            $sMessage = 'Message from : ' . $sEmail . '<br />';
            $sMessage .= $_POST['message'];
        }
        else
        {
            throw new Exception('Error message field is empty');
        }

        $oMail = new PHPMailer();

        $oMail->IsSMTP();
        $oMail->SMTPDebug = 2;
        $oMail->SMTPAuth = true;
        $oMail->SMTPSecure = 'tls';
        $oMail->Host = 'smtp.gmail.com';
        $oMail->Port = 587;
        $oMail->Username = $aEmailConfig['username'];
        $oMail->Password = $aEmailConfig['password'];

        $oMail->SetFrom($aEmailConfig['email'], 'CV Website');
        $oMail->Subject = $sSubject;
        $oMail->MsgHTML($sMessage);
        $oMail->AddAddress($aEmailConfig['email']);

        if(!$oMail->Send()) {
          throw new Exception('Error mail can\'t be send');
        }
    }
    catch (Exception $e)
    {
        header('Content-type: application/json');

        echo json_encode(array(
            'error' => array(
                'msg' => $e->getMessage(),
                'code' => $e->getCode(),
            ),
        ));
    }
