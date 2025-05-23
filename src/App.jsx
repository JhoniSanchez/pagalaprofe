import { useState, useEffect } from "react";
import Blog from "./components/Blog";
import Blog2 from "./components/Blog2";
import blogService from "./services/blogs";
import Login from "./components/Login";
import Formblog from "./components/Formblog";
import Notification from "./components/Notification";
import "./app.css";
import FromFilters from "./components/FromFilters";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { useParams } from "react-router-dom";
import datos from "../data.json";
import LocalBlog from "./components/LocalBlog";

console.log(datos.datos);
const Targeta = ({ blogs }) => {
  return (
    <div className="cuerpo2">
      <div className="gallery">
        {blogs.map((blog) => (
          <Blog2 key={blog.id} blog={blog} />
        ))}
      </div>
    </div>
  );
};
const Local = ({ blogs }) => {
  return (
    <div className="cuerpo2">
      <div className="gallery">
        {blogs.map((blog) => (
          <LocalBlog key={blog.id} blog={blog} />
        ))}
      </div>
    </div>
  );
};

const Targeta2 = ({ blogs }) => {
  return (
    <div className="cuerpo">
      {blogs.map((blog) => (
        <Blog key={blog.id} blog={blog} />
      ))}
    </div>
  );
};
const Targeta3 = ({ blogs }) => {
  return (
    <div className="cuerpo">
      {blogs.map((blog) => (
        <Blog key={blog.id} blog={blog} />
      ))}
    </div>
  );
};

const App = () => {
  const [blogs, setBlogs] = useState([]);

  const [blogs2, setBlogs2] = useState([]);
  const [blogs3, setBlogs3] = useState([]);
  const [blogs4, setBlogs4] = useState([]);
  const [user, setUser] = useState("USER");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [title, settile] = useState("");
  const [author, setauthor] = useState("");
  const [url, seturl] = useState("");
  const [message, setmessage] = useState(null);
  const [newblogs, setnewBlogs] = useState({});

  const [categoria, setcategoria] = useState("");

  const dele = async (id, title) => {
    const result = confirm(`Seguro Eliminar: ${title}`);
    if (result) {
      try {
        const response = await blogService.dele(id);
        const newdata = blogs.filter((el) => el.id !== response.id);
        setBlogs(newdata);

        setmessage(`Blog Deleted ${response.title}`);
        console.log(response);
        console.log(newdata);
      } catch (error) {
        console.log(error);
        setmessage(error.response.data.message);
      }
    }
  };

  const compararProductosPorLikes = (a, b) => {
    const productoA = Number(a.precio);
    const productoB = Number(b.precio);

    if (productoA < productoB) {
      return 1;
    }
    if (productoA > productoB) {
      return -1;
    }
    return 0;
  };

  const compararProductosPorAB = (a, b) => {
    const productoA = Number(a.img);
    const productoB = Number(b.img);

    if (productoA < productoB) {
      return -1;
    }
    if (productoA > productoB) {
      return 1;
    }
    return 0;
  };
  // (a, b) => a.producto - b.producto

  //fue necesario dublicar las funciones por nada me funciono para que no haga referencia a memoria cuando se llama la data y asi no me afecte el metodo sort
  const getblog = async () => {
    // const RESPONSE =  datos

    // const RESPONSE = await blogService.getAll()
    // console.log(ee)
    // const catego = ee.filter(el => el.categoria === categoria)
    // console.log(catego)
    setcategoria("MUJER");
    //ES NECESARIO CREAR COPIAS INDEPENDIENTES, PORQUE LA ORDENACION CON EL METODO SORT, ES POR REFERENCIA A EE, SE ESTA APUNTANDO A LA MISMA SECCION DE MEMORIA,
    //como el ... solo hace copia superficial, se hizo uso del JSONparse Stringify para poder evadir la referneica
    const filter = datos.datos.sort(compararProductosPorLikes);
    setBlogs(filter);
  };

  const getblog2 = async () => {
    // const RESPONSE = await blogService.getAll()
    const filter3987 = datos.datos.sort(compararProductosPorAB);
    setBlogs3(filter3987);
  };

  const addnewblog = async (e) => {
    e.preventDefault();

    try {
      console.log("Blog Nuevo", newblogs);
      await blogService.create({
        title: title,
        author: author,
        url: url,
        likes: "0",
        userId: "user.userId",
        User: "",
      });
      await getblog();
      setmessage(`Blog Add ${title}`);
    } catch (error) {
      setmessage(`${error.code}`);
      console.log(error);
    }
  };

  useEffect(() => {
    getblog();
    getblog2();
    // blogService.getAll().then((blogs) => setBlogs(blogs));
    console.log("Primer render");
  }, []);

  useEffect(() => {
    console.log(user);
  }, [user]);

  // useEffect(() => {
  //   const loggedUserJSON = window.localStorage.getItem("loggedNoteappUser")
  //   if (loggedUserJSON) {
  //     const user = JSON.parse(loggedUserJSON)
  //     setUser(user)
  //     blogService.setToken(user.token)
  //   }
  // }, [username])

  // const handleLogin = async (event) => {
  //   // setdata(null);
  //   try {
  //     event.preventDefault()
  //     console.log("Request Server", password)
  //     const response = await blogService.login({
  //       username: username,
  //       password: password,
  //     })
  //     window.localStorage.setItem(
  //       "loggedNoteappUser",
  //       JSON.stringify(response)
  //     )
  //     setUser(response)
  //     // blogService.setToken(response.token);
  //     console.log("Response Server", response)
  //     setUsername({})
  //     setPassword("")
  //   } catch (error) {
  //     setmessage(`${error.response.data.error}`)
  //     console.log(error)
  //   }
  // }
  const handleLoOff = () => {
    location.reload();

    return window.localStorage.removeItem("loggedNoteappUser");
  };

  const CARGACATEGORIA = (e) => {
    setcategoria(e.target.value);
  };

  useEffect(() => {
    const filter3987 = blogs.sort(compararProductosPorLikes);

    let catego = filter3987.filter((el) => el.categoria === categoria);
    let catego3 = blogs3.filter((el) => el.categoria === categoria);

    setBlogs2(catego);
    setBlogs4(catego3);
  }, [categoria]);

  console.log;
  let ruta = "";

  const rutaa = window.location.href;
  if (rutaa == "https://frontend-paca.onrender.com/ventas-az") {
    ruta = "ab";
  } else if (
    rutaa == "https://frontend-paca.onrender.com/administracion14152024"
  ) {
    ruta = "adm";
  }
  const aa = useParams();

  console.log(aa);
  return (
    <div className="app">
      {/* <div className="encabezado"> */}
      <div className={`encabezado ${ruta}`}>
        <h2>Paca La Profe Ginita</h2>
        <label className="llllll" htmlFor="">
          Categoria
        </label>
        <select name="CATEGORIA" className="llllll" onChange={CARGACATEGORIA}>
          <option value="MUJER">MUJER...</option>
          <option value="CALZADO">CALZADOS</option>

          <option value="PERSONAL">PERSONAL</option>
          <option value="ADORNOS">ADORNO</option>

          <option value="COCINA">COCINA</option>
          <option value="HOGAR">HOGAR</option>

          <option value="CRISTALES">CRISTALES...</option>
          <option value="ELECTRODOMESTICO">ELECTRO...</option>
          <option value="NAVIDAD">NAVIDAD</option>
        </select>{" "}
        {blogs2.length} Art.
        <img
          className="mom"
          src="https://raw.githubusercontent.com/JhoniSanchez/paga-ginita/master/public/mom.jpg"
          alt=""
        />
      </div>

      {/* <FromFilters />
     
     */}
      {/* <Notification
        message={message}
        setmessage={setmessage}
      /> */}
      {
        // !user && (
        //   <Login
        //     // handleLogin={handleLogin}
        //     username={username}
        //     setUsername={setUsername}
        //     password={password}
        //     setPassword={setPassword}
        //   />
        // )
      }
      {/* {user && ( */}
      {/* <div> */}
      {
        // user !== null && (
        // <Formblog
        //   addnewblog={addnewblog}
        //   title={title}
        //   settile={settile}
        //   author={author}
        //   setauthor={setauthor}
        //   url={url}
        //   seturl={seturl}
        // />
        // <FromFilters />
        // )
      }

      {/* <h3 style={{ display: "inline" }}>User: {user.username}</h3>    {user && (
            <input
              type="button"
              value={"Cerrar Sesion"}
              onClick={() => handleLoOff()}
            />
          )} */}

      <BrowserRouter basename="/paga-ginita">
        <Routes>
          <Route path="/" element={<Targeta blogs={blogs2} />}></Route>
            <Route path="/local" element={<Local blogs={blogs2} />}></Route>
          <Route
            path="/administracion14152024"
            element={<Targeta2 blogs={blogs2} />}
          ></Route>
          <Route
            path="/ventas-az"
            element={<Targeta3 blogs={blogs4} />}
          ></Route>
        </Routes>
      </BrowserRouter>

      {/* <div className="cuerpo">
        {blogs2.map((blog) => (
          <Blog key={blog.id} blog={blog} dele={dele} />
        ))}
      </div> */}

      {/* </div> */}
      {/* ) */}
      {/* } */}
    </div>
  );
};

export default App;
