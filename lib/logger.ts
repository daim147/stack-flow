import pino from 'pino';

const isProduction = process.env.NODE_ENV === 'production';
const isEdge = process.env.NEXT_RUNTIME === 'edge';

const logger = pino({
	level: process.env.LOG_LEVEL || 'info',
	transport:
		!isProduction && !isEdge
			? {
					target: 'pino-pretty',
					options: {
						colorize: true,
						ignore: 'pid,hostname',
						translateTime: 'SYS:standard',
					},
				}
			: undefined,

	formatters: {
		level: (label) => ({ level: label.toUpperCase() }),
	},
	timestamp: pino.stdTimeFunctions.isoTime,
});

export default logger;
