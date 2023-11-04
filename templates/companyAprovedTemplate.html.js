export const companyApprovedTemplate = (message, fileLink) => `
<!DOCTYPE html>
<html lang="ar">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>تهانينا على قبول شركتكم بنجاح!</title>
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
            color: #416cb4;
        }

        h2.blog-title {
            color: #333;
            text-align:right;
        }

        .blog-text {
            color: #666;
        }

        #read-more {
            text-align: center;
            margin: 20px 0;
        }

        #read-more a {
            background-color: #416cb4;
            color: #fff;
            text-decoration: none;
            padding: 10px 20px;
            border-radius: 5px;
            font-weight: bold;
        }

        #social-media {
            text-align: center;
            margin-top: 20px;
        }

        .social-icon {
            margin: 0 10px;
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
                <h1>تهانينا على قبول شركتكم بنجاح!</h1>
            </td>
        </tr>
        <tr>
            <td>
                <h2 class="blog-title">الموافقة بعد مراجعة الطلب</h2>
                <p class="blog-text">
                ${message} 
                </p>
                <div id="read-more">
                    <a href="http://localhost:3000">
                        إلى موقعنا الآن</a>
                </div>
                <div align="center">
                    <a href=${fileLink} download>اضغط هنا لتنزيل الملف المرفق</a>
                </div>
            </td>
        </tr>
        <tr>
            <td>
                <div id="social-media">
                    <a href="#"><img
                            src="https://extraaedgeresources.blob.core.windows.net/demo/salesdemo/EmailAttachments/icon-twitter_20190610074030.png"
                            alt="Twitter" class="social-icon"></a>
                    <a href="#"><img
                            src="https://extraaedgeresources.blob.core.windows.net/demo/salesdemo/EmailAttachments/icon-linkedin_20190610074015.png"
                            alt="LinkedIn" class="social-icon"></a>
                    <a href="#"><img
                            src="https://extraaedgeresources.blob.core.windows.net/demo/salesdemo/EmailAttachments/facebook-letter-logo_20190610100050.png"
                            alt="Facebook" class="social-icon"></a>
                </div>
                <p>&copy; 2023 Strong Care. جميع الحقوق محفوظة.</p>
            </td>
        </tr>
    </table>
</body>

</html> 
`;