export interface Story {
	uuid: string;
	type: 'story' | 'bug';
	creator: string;
	// count: number;
	assignee: string | undefined;
	team: string | undefined;
	project: string | undefined;
	feature: string | undefined;
	created_at: Date;
	updated_at: Date;
	closed_at: Date | null;
	status: 'icebox' | 'in progress' | 'in review' | 'completed';
	title: string;
	description: string;
	estimation: StorypointEstimation | null;
	acceptance_criteria: AcceptanceCriterium[] | undefined;
	history: StoryHistory[];
	comments: Comment[];
}

export interface NewStory {
	type: string;
	assignee: string | null;
	team: string | null;
	project: string | null;
	feature: null;
	status: 'icebox';
	title: string;
	description: string;
}

export interface StorypointEstimation {
	complexity: number;
	risk: number;
	effort: number;
}

export interface AcceptanceCriterium {
	uuid: string;
	story_uuid: string;
	description: string;
	accepted_at: Date | null;
	accepted_by: string | null;
}

export interface StoryHistory {
	uuid: string;
	story_uuid: string;
	from_status: string;
	to_status: string;
	date: Date;
	by: string;
}

export interface Comment {
	id: number;
	created_at: Date;
	updated_at: Date;
	story_uuid: string | null;
	user_uuid: string;
	text: string;
}

export interface StoryTransition {
	value: string
	label: string
}
export const getStoryTransitions = (status: string) : StoryTransition[] =>  {
	if (status === "icebox") {
		return [
			{ value: "in progress", label: "start progress" },
			{ value: "completed", label: "complete" }
		]
	} else if (status === "in progress") {
		return [
			{ value: "icebox", label: "stop progress" },
			{ value: "in review", label: "resolve" }
		]
	} else if (status === "in review") {
		return [
			{ value: "in progress", label: "request alteration" },
			{ value: "completed", label: "complete" }
		]
	} else if (status === "completed") {
		return [
			{ value: "icebox", label: "re-open" }
		]
	}
	return [];
}