import type { Core } from "@strapi/strapi";

const allowedMediaTypes = [
	"image/*",
	"video/*",
	"audio/*",
	"application/pdf",
	"application/msword",
	"application/vnd.openxmlformats-officedocument.*",
	"text/plain",
	"text/csv",
];

const deniedExecutableTypes = [
	"application/vnd.microsoft.portable-executable",
	"application/x-msdownload",
	"application/x-msdos-program",
	"application/x-executable",
	"application/x-dosexec",
	"application/x-sh",
	"text/x-shellscript",
	"application/x-mach-binary",
];

export default ({
	env,
}: Core.Config.Shared.ConfigParams): Core.Config.Plugin => ({
	"users-permissions": {
		config: {
			jwtManagement: "refresh",
			sessions: {
				httpOnly: true,
			},
		},
	},

	upload: {
		config: {
			provider: "aws-s3",

			providerOptions: {
				s3Options: {
					credentials: {
						accessKeyId: env("R2_ACCESS_KEY_ID"),
						secretAccessKey: env("R2_SECRET_ACCESS_KEY"),
					},

					endpoint: env("R2_ENDPOINT"),
					region: "auto",
					forcePathStyle: true,

					params: {
						Bucket: env("R2_BUCKET"),
					},
				},
			},

			security: {
				allowedTypes: allowedMediaTypes,
				deniedTypes: deniedExecutableTypes,
			},
		},
	},
});
