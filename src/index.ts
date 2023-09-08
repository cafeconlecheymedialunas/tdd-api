
import Application from "./Application";

const app = Application.getInstance().application();

app.listen(app.get('port'), () => {
  console.log(`Server Started on port:${app.get('port')}`);
});

export { app };
