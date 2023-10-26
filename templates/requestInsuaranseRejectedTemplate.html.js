export const rejectInsuranceRejectedTemplate = (message) => `
<!DOCTYPE html>
<html lang="ar">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>تم رفض طلب الضمان</title>
    <style>
        /* Add your CSS styles here */
        body {
            font-family: Arial, sans-serif;
            background-color: #f4f4f4;
            margin: 0;
            padding: 0;
        }

        #email-container {
            width: 600px;
            margin: 0 auto;
            background-color: #fff;
            border-radius: 10px;
            box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
            padding: 20px;
        }

        #email-logo {
            text-align: center;
            display: block;
        }

        #email-logo img {
            width: 140px;
        }

        h1 {
            text-align: center;
            color: #ff0000; 
        }

        h2.blog-title {
            color: #333;
            text-align:right;
        }

        .blog-text {
            color: #666;
        }

        p {
            text-align: center;
            color: #888;
        }
    </style>
</head>

<body>
    <table id="email-container">
        <tr>
            <td>
                <a id="email-logo" href="https://strong-care-tjet-4rmtt0g0q-mahmoud-rifaats-projects.vercel.app/"
                    title="logo" target="_blank">
                    <img src="https://res.cloudinary.com/dcqttctnu/image/upload/v1696687157/logo_kpuli0.png" alt="logo">
                </a>
            </td>
        </tr>
        <tr>
            <td>
                <h1>تم رفض طلب الضمان</h1>
            </td>
        </tr>
        <tr>
            <td>
                <h2 class="blog-title">تم رفض طلب الضمان بناءً على المعلومات التالية:</h2>
                <p class="blog-text">
                ${message} 
                </p>
            </td>
        </tr>
        <tr>
            <td>
                <p>&copy; 2023 Strong Care. جميع الحقوق محفوظة.</p>
            </td>
        </tr>
    </table>
</body>

</html>
`;
