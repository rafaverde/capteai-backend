import type { Core } from "@strapi/strapi";

export default ({
	env,
}: Core.Config.Shared.ConfigParams): Core.Config.Middlewares => [
	"strapi::logger",
	"strapi::errors",

	{
		name: "strapi::security",
		config: {
			contentSecurityPolicy: {
				useDefaults: true,
				directives: {
					"connect-src": ["'self'", "https:"],

					"img-src": [
						"'self'",
						"data:",
						"blob:",
						"https://market-assets.strapi.io",
						env("R2_PUBLIC_URL"),
					],

					"media-src": [
						"'self'",
						"data:",
						"blob:",
						"https://market-assets.strapi.io",
						env("R2_PUBLIC_URL"),
					],

					upgradeInsecureRequests: null,
				},
			},
		},
	},

	"strapi::cors",
	"strapi::poweredBy",
	"strapi::query",
	"strapi::body",
	"strapi::session",
	"strapi::favicon",
	"strapi::public",
];
