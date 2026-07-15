import { StrapiApp } from "@strapi/strapi/admin";

export default {
	config: {
		locales: ["pt-BR", "en"],
		translations: {
			"pt-BR": {
				"Auth.form.welcome.title": "Bem-vindo ao CMS Capte.ai",
				"Auth.form.welcome.subtitle": "Faça login para continuar",
				"Auth.form.email.label": "E-Mail",
				"Auth.fomr.password.label": "Senha",
			},
		},
	},
	bootstrap(app: StrapiApp) {},
};
