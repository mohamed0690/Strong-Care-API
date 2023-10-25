export const confirmedEmailSuccessfullyTemplate = `<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
    <title>Success Confirmation Popup</title>
    <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto|Varela+Round">
    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.5.0/css/bootstrap.min.css">
    <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons">
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css">
    <!-- Add your FontAwesome Pro library link here -->
    <script src="https://code.jquery.com/jquery-3.5.1.min.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/popper.js@1.16.0/dist/umd/popper.min.js"></script>
    <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.5.0/js/bootstrap.min.js"></script>
    <!-- Add FontAwesome Pro script here -->

    <style>
        body {
            font-family: 'Varela Round', sans-serif;
        }

        .confirmation-popup {
            color: #636363;
            width: 325px;
            font-size: 14px;
            margin: 100px auto;
        }

        .confirmation-popup .content {
            padding: 20px;
            border-radius: 5px;
            border: none;
        }

        .confirmation-popup .header {
            border-bottom: none;
            text-align: center;
            font-size: 26px;
            margin: 30px 0 -15px;
        }

        .confirmation-popup .message {
            text-align: center;
            margin: 20px 0;
        }

        .confirmation-popup .btn {
            min-height: 40px;
            border-radius: 3px;
            color: #fff;
            border-radius: 4px;
            background: #82ce34;
            text-decoration: none;
            transition: all 0.4s;
            line-height: normal;
            border: none;
            display: block;
            width: 100%;
            margin-top: 20px;
        }

        .confirmation-popup .btn:hover,
        .confirmation-popup .btn:focus {
            background: #6fb32b;
            outline: none;
        }

        .icon-box {
            color: #fff;
            margin: 0 auto;
            width: 95px;
            height: 95px;
            border-radius: 50%;
            background: #82ce34;
            padding: 15px;
            text-align: center;
            box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.1);
        }

        .icon-box i {
            font-size: 58px;
            position: relative;
            top: 3px;
        }
    </style>
</head>

<body>
    <div class="confirmation-popup">
        <div class="content">
            <div class="icon-box">
                <i class="material-icons">&#xE876;</i>

                <i class="fa fa-bell"></i>


            </div>
            <div class="header">Awesome!</div>
            <div class="message">Your email has been confirmed.</div>
            <a href="http://localhost:3000/signup2" class="btn">Complete Registration</a>
        </div>
    </div>
</body>

</html>`