const port = 4545
      path = "";

      function print_data(json) {
        tag = "";
        console.log(json)
        for (i of json) {
          tag += `<button onclick="chang_dir('${i}')">${i}</button>`;
        }
        document.getElementById("list").innerHTML = tag;
      }

      fetch("http://127.0.0.1:4545/directory", {
        method: "GET",
      })
        .then((response) => response.json())
        .then((json) => {print_data(json[0])
          path = json[1]
        });

      function chang_dir(dir) {
        path += "/" + dir;
        fetch("http://127.0.0.1:4545/post-data", {
          method: "POST",
          body: JSON.stringify({
            dir: path,
          }),
          headers: {
            "Content-type": "application/json; charset=UTF-8",
          },
        })
          .then((response) => response.json())
          .then((json) => {print_data(json[0])
            path = json[1]
          });
      }

      function back_dir() {
        fetch("http://127.0.0.1:4545/back-dir", {
          method: "POST",
          body: JSON.stringify({}),
          headers: {
            "Content-type": "application/json; charset=UTF-8",
          },
        })
          .then((response) => response.json())
          .then((json) => {print_data(json[0]);
            path = json[1]
          });
}