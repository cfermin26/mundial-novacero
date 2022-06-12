import React, { useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { StaticImage } from "gatsby-plugin-image";
import Helmet from "react-helmet";
import Spinner from "../components/spinner";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import "bootstrap/dist/css/bootstrap.min.css";
import "../styles.css";

const IndexPage = () => {
  const Toast = Swal.mixin({
    toast: true,
    position: "top-end",
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
    didOpen: (toast) => {
      toast.addEventListener("mouseenter", Swal.stopTimer);
      toast.addEventListener("mouseleave", Swal.resumeTimer);
    },
  });

  const [activeSpinner, setActiveSpinner] = useState(false);
  const [nombres, setNombres] = useState("");
  const [apellidos, setApellidos] = useState("");
  const [cedula, setCedula] = useState("");
  const [email, setEmail] = useState("");
  const [celular, setCelular] = useState("");
  const [ciudad, setCiudad] = useState("");
  const [direccion, setDireccion] = useState("");
  const [imagedata, setImagedata] = useState("");

  const handleChange = (file) => {
    setImagedata(file[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setActiveSpinner(true);
    const dataForm = new FormData();
    dataForm.append("image", imagedata);
    dataForm.append("nombres", nombres);
    dataForm.append("apellidos", apellidos);
    dataForm.append("cedula", cedula);
    dataForm.append("email", email);
    dataForm.append("celular", celular);
    dataForm.append("ciudad", ciudad);
    dataForm.append("direccion", direccion);
    const respuesta = await axios.post(
      "https://kernel.devseason.xyz/public/api/concurso",
      dataForm
    );
    if (respuesta.status === 200) {
      if (respuesta.data.status === "Ok") {
        setNombres("");
        setApellidos("");
        setCedula("");
        setEmail("");
        setCelular("");
        setCiudad("");
        setDireccion("");
        e.target.reset();
        setActiveSpinner(false);
        Toast.fire({
          icon: "success",
          title: "Gracias por participar",
        });
      } else {
        setActiveSpinner(false);
        Toast.fire({
          icon: "error",
          title: "Error al enviar la información",
        });
      }
    } else {
      setActiveSpinner(false);
      Toast.fire({
        icon: "error",
        title: "Error al enviar la información",
      });
    }
  };

  return (
    <>
      <Helmet>
        <title>Mundial Novacero</title>
        <meta
          name="keywords"
          content="metro ecuador, metro, novacero, mundial"
        />
        <meta
          name="description"
          content="Participa y gana uno de los 50 balores del mundial y unos de los 100 kits Novacero"
        />
        <meta property="og:title" content="Mundial Novacero" />
        <meta property="og:url" content="https://metroecuador.createamec/" />
        <meta property="og:type" content="article" />
        <meta
          property="og:description"
          content="Participa y gana uno de los 50 balores del mundial y unos de los 100 kits Novacero"
        />

        <meta
          property="og:image"
          content="https://novaceromundial.createamec.com/concurso-novacero.png"
        />
        <meta property="og:image:type" content="image/png" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
      </Helmet>

      <Container className="background mt-md-5">
        <Row>
          <Col md={6} className="my-auto pt-4 pt-md-0">
            <StaticImage
              src="../images/novacero-banner.png"
              alt="novacero sorpresa"
            />
          </Col>
          <Col md={6} className="my-auto p-4">
            <Form
              className="contact-form mx-auto py-4"
              id="formDiploma"
              onSubmit={handleSubmit}
            >
              <Container>
                <Row className="mb-2">
                  <Col md={12} className="text-center">
                    <h1 className="titulo">
                      Información de <br /> registro
                    </h1>
                  </Col>
                </Row>

                <Row className="mb-3">
                  <Col md={12}>
                    <FloatingLabel label="Nombres">
                      <Form.Control
                        type="text"
                        required
                        onChange={(e) => setNombres(e.target.value)}
                      />
                    </FloatingLabel>
                  </Col>
                  <Col md={12}>
                    <FloatingLabel label="Apellidos">
                      <Form.Control
                        type="text"
                        required
                        onChange={(e) => setApellidos(e.target.value)}
                      />
                    </FloatingLabel>
                  </Col>
                  <Col md={12}>
                    <FloatingLabel label="Cédula">
                      <Form.Control
                        type="text"
                        required
                        onChange={(e) => setCedula(e.target.value)}
                      />
                    </FloatingLabel>
                  </Col>
                  <Col md={12}>
                    <FloatingLabel label="Email">
                      <Form.Control
                        type="email"
                        required
                        onChange={(e) => setEmail(e.target.value)}
                      />
                    </FloatingLabel>
                  </Col>

                  <Col md={12}>
                    <FloatingLabel label="Celular">
                      <Form.Control
                        type="text"
                        required
                        onChange={(e) => setCelular(e.target.value)}
                      />
                    </FloatingLabel>
                  </Col>
                  <Col md={12}>
                    <FloatingLabel label="Ciudad">
                      <Form.Control
                        type="text"
                        required
                        onChange={(e) => setCiudad(e.target.value)}
                      />
                    </FloatingLabel>
                  </Col>
                  <Col md={12}>
                    <FloatingLabel label="Dirección">
                      <Form.Control
                        type="text"
                        required
                        onChange={(e) => setDireccion(e.target.value)}
                      />
                    </FloatingLabel>
                  </Col>
                  <Col md={12}>
                    <Form.Group controlId="formFile" className="mb-3">
                      <Form.Label className="form-label mt-3">
                        Adjuntar foto
                      </Form.Label>
                      <Form.Control
                        type="file"
                        name="image"
                        id="name"
                        className="border-0"
                        required
                        onChange={(e) => handleChange(e.target.files)}
                      />
                    </Form.Group>
                  </Col>
                  <Col
                    md={12}
                    className="text-center d-flex justify-content-center"
                  >
                    {activeSpinner ? (
                      <Spinner className="mt-4" />
                    ) : (
                      <Button
                        type="submit"
                        variant="primary"
                        className="btn-enviar px-4"
                      >
                        Enviar
                      </Button>
                    )}
                  </Col>
                </Row>
              </Container>
            </Form>
            <div className="mb-3"></div>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default IndexPage;
