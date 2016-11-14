<?php
    // configure
    $from = 'veydodur@yroid.com';
    $sendTo = 'veydodur@yroid.com';
    $asuntoMensaje = 'Nuevo mensaje del formulario de Contacto';
    $campos = array('name' => 'Nombre', 'email' => 'Correo electrónico', 'asunto' => 'Asunto', 'mensaje' => 'Mensaje'); // array variable name => Text to appear in email
    $mensajeOk = 'Mensaje enviado correctamente. En breve nos pondremos en contacto con usted.';
    $mensajeErr = 'Error al enviar el mensaje. Por favor, intentelo de nuevo más tarde.';

    // let's do the sending

    try
    {
        $emailTexto = "Nuevo mensaje del formulario de Contacto\n=============================\n";

        foreach ($_POST as $key => $value) {

            if (isset($campos[$key])) {
                $emailTexto .= "$campos[$key]: $value\n";
            }
        }

        mail($sendTo, $asuntoMensaje, $emailTexto, "De: " . $from);


        $responseArray = array('type' => 'success', 'message' => $mensajeOk);
    }
    catch (\Exception $e)
    {
        $responseArray = array('type' => 'danger', 'message' => $mensajeErr);
    }

    if (!empty($_SERVER['HTTP_X_REQUESTED_WITH']) && strtolower($_SERVER['HTTP_X_REQUESTED_WITH']) == 'xmlhttprequest') {
        $encoded = json_encode($responseArray);

        header('Content-Type: application/json');

        echo $encoded;
    }
    else {
        echo $responseArray['message'];
    }
?>