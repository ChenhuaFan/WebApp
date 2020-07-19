type tplotOptions = {
	[propName: string]: RegExp;
}

interface EntranceEnums {
	"PHONE_REGS": tplotOptions;
	"TIME": number;
}

// Enums using for Login and Regster components.
export const EntranceEnums: EntranceEnums = {
	"PHONE_REGS": {
		"1": /^(\(\d{3}\)|\d{3})\s?-?\d{3}-?\s?\d{4}$/,
		"86": /^1[3456789]\d{9}$/
	},
	"TIME": 60,
}

export const VERIFIED_ID = 'get-captcha-button';

export enum UserPhase {
	PHASE_I = 1,
	PHASE_II = 2,
	LOGGED_IN = 3,
}