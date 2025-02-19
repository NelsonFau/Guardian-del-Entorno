import React from "react";  
import './styleCard.css'
import paisaje from '../../image/paisaje.jpg';

function Card() {
    return (
    <div className='row'>
        <div class="card col-12 col-md-4">
                <img src={paisaje} class="card-img-top" alt="..." />
            <div class="card-body">
                <h5 class="card-title">Card title</h5>
                <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                <a href="#" class="btn btn-primary">Go somewhere</a>
            </div>
            {/* Formulario de comentarios */}
            <div>
            <h6>Comentarios:</h6>
            <form >
                <textarea
                //   value={nuevoComentario}
                //   onChange={handleComentarioChange}
                className="form-control"
                rows="3"
                placeholder="Escribe tu comentario aquí..."
                ></textarea>
                <button type="submit" className="btn btn-primary mt-2">Agregar comentario</button>
            </form>

            {/* Mostrar los comentarios */}
            <div className="mt-3">
                <h6>Comentarios recientes:</h6>
                <ul>
                {/* {comentarios.map((comentario, index) => (
                    <li key={index}>{comentario}</li>
                ))} */}
                </ul>
            </div>
            </div>
        </div>
        <div class="card col-12 col-md-4">
                <img src={paisaje} class="card-img-top" alt="..." />
            <div class="card-body">
                <h5 class="card-title">Card title</h5>
                <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                <a href="#" class="btn btn-primary">Go somewhere</a>
            </div>
        </div>
        <div class="card col-12 col-md-4">
                <img src={paisaje} class="card-img-top" alt="..." />
            <div class="card-body">
                <h5 class="card-title">Card title</h5>
                <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                <a href="#" class="btn btn-primary">Go somewhere</a>
            </div>
        </div>
        <div class="card col-12 col-md-4">
                <img src={paisaje} class="card-img-top" alt="..." />
            <div class="card-body">
                <h5 class="card-title">Card title</h5>
                <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                <a href="#" class="btn btn-primary">Go somewhere</a>
            </div>
        </div>
        <div class="card col-12 col-md-4">
                <img src={paisaje} class="card-img-top" alt="..." />
            <div class="card-body">
                <h5 class="card-title">Card title</h5>
                <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                <a href="#" class="btn btn-primary">Go somewhere</a>
            </div>
        </div>
        <div class="card col-12 col-md-4">
                <img src={paisaje} class="card-img-top" alt="..." />
            <div class="card-body">
                <h5 class="card-title">Card title</h5>
                <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                <a href="#" class="btn btn-primary">Go somewhere</a>
            </div>
        </div>
        <div class="card col-12 col-md-4">
                <img src={paisaje} class="card-img-top" alt="..." />
            <div class="card-body">
                <h5 class="card-title">Card title</h5>
                <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                <a href="#" class="btn btn-primary">Go somewhere</a>
            </div>
        </div>
        <div class="card col-12 col-md-4">
                <img src={paisaje} class="card-img-top" alt="..." />
            <div class="card-body">
                <h5 class="card-title">Card title</h5>
                <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                <a href="#" class="btn btn-primary">Go somewhere</a>
            </div>
        </div>
    </div>
    );
}

export default Card; 