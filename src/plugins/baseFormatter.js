
export default {
    install: (app, options) => {
        app.config.globalProperties.$formatDate = (dateString) => {
            const date = new Date(dateString);
            return new Intl.DateTimeFormat('ru-RU',{year: 'numeric', month: 'numeric', day: 'numeric',}).format(date);
        }
    }
  }