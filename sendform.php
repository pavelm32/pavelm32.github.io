<?php

    if((!isset($_SERVER['HTTP_X_REQUESTED_WITH']) || empty($_SERVER['HTTP_X_REQUESTED_WITH'])
        || strtolower($_SERVER['HTTP_X_REQUESTED_WITH']) != 'xmlhttprequest') || empty($_POST)) {
        // Если к нам идёт Ajax запрос, то ловим его
        echo json_encode(['status' => false, 'message' => 'Произошла ошибка #1' . $_SERVER['HTTP_X_REQUESTED_WITH']]);
        exit;
    }

    foreach ($_POST as $key => &$value) {
        $value = htmlspecialchars(trim($value));
    }

    $name  = isset($_POST['uname']) && !empty($_POST['uname']) ? $_POST['uname'] : "не указано";
    $phone = isset($_POST['uphone']) && !empty($_POST['uphone']) ? $_POST['uphone'] : "не указано";
    $street = isset($_POST['street']) && !empty($_POST['street']) ? $_POST['street'] : "не указано";;
    $house = isset($_POST['house']) && !empty($_POST['house']) ? $_POST['house'] : "не указано";;
    $korpus = isset($_POST['korpus']) && !empty($_POST['korpus']) ? $_POST['korpus'] : "не указано";;
    $apartment = isset($_POST['apartment']) && !empty($_POST['apartment']) ? $_POST['apartment'] : "не указано";;
    $floor = isset($_POST['floor']) && !empty($_POST['floor']) ? $_POST['floor'] : "не указано";;
    $message = isset($_POST['comment']) && !empty($_POST['comment']) ? $_POST['comment'] : "не указано";;

    $is_call = isset($_POST['is_call']) ? "ДА" : "НЕТ";
    $pay = isset($_POST['type_pay']) && $_POST['type_pay'] == 1 ? "Потребуется сдача" : "Оплата по карте";

    $mail_message = '
    <html>
    <head>
        <title>Заявка</title>
    </head>
    <body>
        <h2>Заказ</h2>
        <ul>
            <li>Имя:' . $name . '</li>
            <li>Телефон: ' . $phone . '</li>
            <li>Адрес доставки: ул.' .$street . ' д.' .$house  . ' к.' . $korpus . ' кв.' . $apartment . ' этаж ' . $floor . '</li>
            <li>Способ оплаты: ' . $pay . '</li>
            <li>Комментарий к заказу: ' . $message . '</li>
            <li>Нужно ли перезванивать клиенту: ' . $is_call . '</li>
        </ul>
    </body>
    </html>';

    $headers = "From: Форма заказа <oreder@landos.com>\r\n".
                "MIME-Version: 1.0" . "\r\n" .
                "Content-type: text/html; charset=UTF-8" . "\r\n";

    $mail = mail('ya.forbidden-89@yandex.ru', 'Заказ', $mail_message, $headers);

    $data = [];

    if ($mail) {
        $data['status'] = true;
        $data['message'] = "Сообщение отправлено";
    }else{
        $data['status'] = false;
        $data['message'] = "Произошла ошибка #2";
    }

    echo json_encode($data);

?>
