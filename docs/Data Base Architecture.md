Arquitectura de la base de datos NoSQL Firebase del proyecto "Mikuy"

---
# 1. Colecciones Remotas (Firebase Realtime Database)
## 1.1. Campos aplicado a todos los documentos

* Identificador primario:
	* tipo: uid(string) "firebase-generated",
	* descripción: Se usa uid para documentos en colecciones administrativas, int para documentos en colecciones de recursos y almacén
* Creación de documento (createdAt):
	* nombre de campo: created_at
	* tipo: date
	* descripción: Fecha de creación del documento
* Actualización de documento (updatedAt): 
	* nombre de campo:  updated_at
	* tipo: date
	* descripción: Fecha de actualización del documento
* Administrador de creación de documento (createdBy):
	* nombre de campo: created_by
	* tipo: uid(string)
	* descripción: Identificador del administrador que creo el documento
* Administrador de actualización de documento (updatedBy):
	* nombre de campo: updated_by
	* tipo: uid(string)
	* descripción: Identificador del administrador que actualizo el documento
## 1.2. Campos aplicado a la colección "recipes"

* Aplica createdAt, updatedAt, createdBy::authorId

* Nombre (name):
	* nombre de campo: name
	* tipo: string no caracteres especiales
	* descripción: Nombre de la receta (60 caracteres)
* Estado de la receta (status):
	* nombre de campo: status
	* tipo: bool
	* descripción: Estado de la receta
* Descripción (description):
	* nombre de campo: description
	* tipo: string
	* descripción: Descripción corta del receta (200 caracteres)
* Dificultad (difficulty): 
	* nombre de campo:  difficulty
	* tipo: enum(fácil || intermedio || avanzado)
	* descripción: Dificultad del receta
* Tiempo de preparación (duration): 
	* nombre de campo:  duration
	* tipo: number(int)
	* descripción: Tiempo total de preparación (auto calculado de los procedimientos, en minutos) 
* Portada (thumbnail):
	* Las imágenes estarán en fire storage y la carga sera en la aplicación cámara o galería
	* nombre de campo: thumbnail
	* tipo: string
	* descripción: Dirección de la imagen de portada del receta (es obligatorio)
* Imágenes (images): 
	* nombre de campo: images
	* tipo: array(string)
	* descripción: Dirección de la imágenes del receta, (no es obligatorio, máximo 3)
* Categoría (categoryId): (categorías obligatoria)
	* nombre de campo: categories
	* tipo: array(enum(string)) (Desayunos, Entradas, Fondos, Sopas, Ensaladas, Bebidas, Postres, Aperitivos, Salsas, Comida rápida, Repostería, Sandwich Innovación)
	* descripción: categorías principales de la receta
* Tags: (observed)
	* Sabor (flavors): 
		* nombre de campo: flavors
		* tipo: array(enum(string))  (Dulce, Salado, Ácido, Amargo, Umami, Picante, Agridulce, Fresco, Ahumado, Herbáceo, Especiado)
		* descripción: sabores de la receta
	* Textura (textures):
		* nombre de campo: texture
		* tipo: array(enum(string)) (Cremoso, Grasoso, Terroso, Esponjoso, Suave, Fibroso, Gelatinoso, Crujiente)
		* descripción: texturas de la receta
	* Temporadas (seasons)
		* nombre de campo: seasons
		* tipo: array(string) 
		* seasons:
			* Temporada de Calor
			* Temporada de Frío
			* Navidad
			* Pascua 
			* Año Nuevo
			* Semana Santa
			* Carnavales
			* Día de Muertos
			* Fiestas Patrias
			* San Valentín
			* --dynamic--
		* descripción: Estaciones de la receta
	* Alergias (allergies):
		* nombre de campo: ingredients
		* tipo: array(enum(string))  (Sin) (Mani,  Mariscos, Gluten, Lactosa, Pescado, Huevo, Frutos Secos, Trigo, Frutas)
		* descripción: alergias relacionadas a la receta
	* Dietética (diets):
		* nombre de campo: ingredients
		* tipo: array(enum(string)) (Vegana, Vegetariana, Cetogénica (Alto en grasas, bajo en carbohidratos), DASH (Baja en sales, Control de hipertensión), Sin Gluten, Low FODMAP (Bajo en carbohidratos fermentables), Cruda,  Macrobiótica, Detox (Detoxificante), Alto en proteínas, Bajo en carbohidratos, Bajo en azúcar, Bajo en grasas saturadas)
		* descripción: dietas principales de la receta
* Porciones (servings):
	* nombre de campo: servings
	* tipo: number(int)
	* descripción: número de porciones o personas
* Ingredientes (ingredients):
	* nombre de campo: ingredients
	* tipo: array(object({name: "leche", quantity:  2, unit: litros}))
	* descripción: listado de ingredientes
* Procedimiento (procedure): 
	* nombre de campo: procedure
	* tipo: array(object({title: "Titulo de sección", duration: 5, children: array(object())})) , 
	* descripción: procedimientos de la receta, lista de secciones y comentarios, los comentarios pueden contener (link recipe, y link externo (YouTube debe mostrarse el video)), las secciones pueden contener pasos y comentarios, los pasos se numeran automáticamente dentro de una misma sección,  Verificación de no caracteres especiales, sobre todo para los comentarios especiales de link recipe y link externo "[etiqueta]" seguido y sin espacio "(link)" 
	* e.g.
{
   "procedure":  [
      {
         "title":"Seccion 1:",
         "children":[
            {
               "type":"comment",
               "content":"Antes de empezar primero ve esta receta ()[]"
            },
            {
               "type":"step",
               "content":"Primero calentamos la sarten con abundante aceite]"
            },
         ]
      },
      {
		"title":"Seccion 2:"
    }
   ]
}

C4gnunkZ1BUJmDSSdRtk -> Reposteria
Ij6HbHuds7M10jr2tY73 -> Hecho en casa
KaRlk0uFsHWfZmSRumRw -> Postres
RdFAZfrSruUIMhmg07d8 -> Desayunos
VxkMVRyYkgcHhIhY807s -> Entradas
W6Etb8AArW3IvCrtvjFc -> Sopas
XUYcbwc3n9tP1oXEHmms -> Comida rapida
lq6I4pcAdrJo0OygkPvl -> Sandwichs
rbFkW0MBMSAGtUKde3Jt -> Bebidas
vcXYDF1ZlWsul5WHFl7h -> Aperitivos
yeHl2ZoXTw1mrZzczkO6 -> Salsas
yqMQAzER4tkdCXemDQHG -> Fondos
yzoAur2fw6TydZJoVPow -> Ensaladas

type: "tip" || "note" || "warning"
## 1.3. Campos aplicado a la colección "users"

Por parte de la authentication de firebase: 
		createdAt, email, image, name
* image: photoUrl, name: displayName  

* Apodo (nickname): editable y único
	* nombre de campo: nickname
	* tipo: unique(string) minus no caracteres especiales
	* descripción: apodo del usuario (20 caracteres)
* Imagen de banner (banner): editable
	* nombre de campo: banner
	* tipo: string
	* descripción: imagen de banner del usuario
* Description (description) : editable
	* nombre de campo: description
	* tipo: string (200 caracteres)
	* descripción: descripción de usuario
* Registrado (verified): no editable (administración)
	* nombre de campo: verification
	* tipo: boolean
	* descripción: usuario verificado
* Guardados (markedRecipes) editable
	* nombre de campo: marked
	* tipo: array(id) 
	* descripción: Nombre del usuario (20 caracteres)
* Recetas (createdRecipes) array(id)
* Redes Sociales (socialNet) facebook:string, watsapp:string, tiktok:string, instagram:string, email:string
* Experiencia (experience): string(200)
* Sobre mi (aboutMe): string(200)
## 1.4. Campos aplicado a la colección "ratingRecipes"

Creado en consecuencia por la creación de una nueva receta (mantienen el mismo identificador Llave de la receta)
* Rating promedio (averageRating):  (autocalculado)
	* nombre de campo: averageRating
	* tipo: double(0.1f)
* Rating Total (totalRating):  (autocalculado)
	* nombre de campo: totalRating
	* tipo: int
* Rating Individuales (individualRating): 
	* nombre de campo: individualRating
		* tipo: array(object(authorId, rating(int), createdAt(timestamp), review(string(200)))
## 1.5 Campos aplicado a la colección "userRelations"
* Siguiendo (following): 
	* nombre de campo: following
	* tipo: array(id)
	* descripción: lista de usuarios seguidos
* Seguidores (followers): 
	* nombre de campo: followers
	* tipo: int
	* descripción: cantidad de seguidores

# 2. Colecciones Locales (AsyncStorage-SQLite)
## 2.1. Campos aplicado a la colección "@MikuyUserActivity"

* Recetas Borrador (draftRecipe)
	* tipo: object(recipe)
* Primera ves en la aplicación (firstTime): 
	* tipo:  boolean
* Recientes (coming soon)
* Preferences Tag(coming soon)
## 2.1. Campos aplicado a la colección "@MikuyUserConfig"

* Theme (coming soon)
* Preferred Language (coming soon)
* Sounds Enabled (coming soon)