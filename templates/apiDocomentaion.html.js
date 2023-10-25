export const apiDocumentationTemplate = `<!DOCTYPE html>
<html>

<head>
  <style>
    body {
      text-align: center;
      background-color: #f0f0f0;
      font-family: Arial, sans-serif;
    }

    h1 {
      color: #333;
      margin: 20px 0;
    }

    img {
      width: 100%;
      height: 70vh;
      margin: 20px 0;
    }

    a {
      text-decoration: none;
      background-color: #007bff;
      color: #fff;
      padding: 10px 20px;
      border-radius: 5px;
    }
  </style>
</head>

<body>
  <h1>Welcome to the Strong Care API</h1>
  <img src="https://blog.postman.com/wp-content/uploads/2021/03/APIs-in-Postman-e1616786230943.png" alt="API Image">
  <div class="postman-run-button"
    data-postman-action="collection/fork"
    data-postman-visibility="public"
    data-postman-var-1="25298794-74e341c0-3db5-4b4b-a6a6-8ce0c67f05b1"
    data-postman-collection-url="entityId=25298794-74e341c0-3db5-4b4b-a6a6-8ce0c67f05b1&entityType=collection&workspaceId=118c41af-a6f6-4010-a057-08e8847b2b8e">
  </div>

  <script type="text/javascript">
    (function (p, o, s, t, m, a, n) {
      !p[s] && (p[s] = function () {
        (p[t] || (p[t] = [])).push(arguments);
      });
      !o.getElementById(s + t) && o.getElementsByTagName("head")[0].appendChild(
        (n = o.createElement("script")),
        (n.id = s + t),
        (n.async = 1),
        (n.src = m),
        n
      );
    }(window, document, "_pm", "PostmanRunObject", "https://run.pstmn.io/button.js"));
  </script>
</body>

</html>
`;
