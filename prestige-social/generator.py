import datetime, json, pathlib

ROOT = pathlib.Path(__file__).resolve().parent
QUEUE = ROOT / 'queue'

POSTS = [
    {
        'campaign': 'Scope Before You Start',
        'hook': 'The cheapest remodeling quote can become the most expensive job.',
        'body': 'A solid estimate should account for the whole project—not just the obvious materials. Setup, protection, delivery, disposal, hidden damage, labor, and finish work all matter. A clear scope up front helps prevent expensive surprises later.'
    },
    {
        'campaign': 'Bathroom Water Protection',
        'hook': 'Tile is not the waterproofing in a shower.',
        'body': 'The waterproofing system behind the finished surface is what protects the wall assembly. Homeowners should ask what system is being used, how seams and penetrations are treated, and how the transition at the tub or shower base is handled.'
    },
    {
        'campaign': 'Roof Leak Reality',
        'hook': 'A roof leak does not always start directly above the stain.',
        'body': 'Water can travel along decking, framing, fasteners, flashing, and insulation before it becomes visible inside. Proper diagnosis means tracing the water path instead of simply patching the first spot that looks suspicious.'
    },
    {
        'campaign': 'Deck Structure First',
        'hook': 'A good-looking deck can still have a bad structure underneath it.',
        'body': 'Ledger attachment, flashing, beam support, post connections, joist spacing, stair geometry, and guard details matter long before the finish boards go down. Structure first. Appearance second.'
    },
    {
        'campaign': 'Siding Water Management',
        'hook': 'Siding is part of a water-management system—not just the outside color of the house.',
        'body': 'Flashing, housewrap, window and door transitions, penetrations, and kick-out details help control where water goes. Covering a bad detail with new siding does not make the underlying problem disappear.'
    },
    {
        'campaign': 'Change Orders Protect Everyone',
        'hook': 'If the scope changes, the price and schedule may need to change too.',
        'body': 'Unexpected damage or homeowner-requested upgrades should be documented before the extra work is performed. Clear change orders protect the homeowner and the contractor by keeping scope, cost, and expectations aligned.'
    },
    {
        'campaign': 'Foundation Insulation Detail',
        'hook': 'Exterior foundation insulation fails fast when the exposed edge is ignored.',
        'body': 'Below-grade and exposed foundation insulation need the correct protection and finish for the location. Moisture exposure, UV, impact, grade level, and the transition into siding all need to be considered as one detail.'
    },
    {
        'campaign': 'Window Leak Diagnosis',
        'hook': 'Replacing caulk is not the same thing as fixing a leaking window.',
        'body': 'Water can enter through failed flashing, trim details, siding transitions, deteriorated framing, or the window unit itself. The repair should address the actual entry path, not just cover the symptom.'
    },
    {
        'campaign': 'Homeowner Planning',
        'hook': 'One of the best ways to control remodeling cost is to make decisions before demolition starts.',
        'body': 'Selections, access, disposal, material lead times, hidden-condition allowances, and sequencing all affect the job. Better planning means fewer mid-project surprises and fewer avoidable delays.'
    },
    {
        'campaign': 'Contractor Quality',
        'hook': 'The work you cannot see often matters more than the finish you can.',
        'body': 'Fasteners, flashing, waterproofing, framing connections, prep work, substrate condition, and air or water sealing are the details that determine whether a remodel keeps performing after the photos are taken.'
    },
    {
        'campaign': 'Roof Flashing',
        'hook': 'Most roof problems are detail problems.',
        'body': 'Chimneys, sidewalls, valleys, skylights, penetrations, and roof-to-wall transitions deserve as much attention as the shingles or panels themselves. Good flashing details are a major part of keeping water out.'
    },
    {
        'campaign': 'Remodeling Estimate',
        'hook': 'A useful remodeling estimate should tell you what is actually included.',
        'body': 'Homeowners should be able to understand the major scope, materials or allowances, exclusions, payment structure, and what happens if hidden conditions are discovered. A single number without scope leaves too much room for confusion.'
    },
    {
        'campaign': 'Exterior Repair',
        'hook': 'Small exterior damage is easier to fix before water turns it into structural damage.',
        'body': 'Loose flashing, damaged trim, open joints, deteriorated sealant, exposed sheathing, and failed siding details can let moisture travel farther than expected. Early repair can prevent a much larger project.'
    },
    {
        'campaign': 'Local Contractor CTA',
        'hook': 'Planning a remodeling or exterior project around Manitowoc?',
        'body': 'Prestige Remodeling handles residential remodeling, repairs, roofing, siding, decks, bathrooms, and other home-improvement work with the scope worked out before the job starts.'
    }
]

def main():
    today = datetime.date.today()
    post = POSTS[today.toordinal() % len(POSTS)]
    caption = f"{post['hook']}\n\n{post['body']}\n\nNeed an estimate for your project? Prestige Remodeling serves Manitowoc and the Wisconsin lakeshore.\nPrestigeRemodelingWI.com | 920-242-0969"
    item = {
        'status': 'ready',
        'campaign': post['campaign'],
        'targets': ['facebook'],
        'media_type': 'text',
        'media_url': '',
        'captions': {'facebook': caption},
        'source': 'prestige-local-marketing-bot',
        'generated_for': today.isoformat()
    }
    QUEUE.mkdir(parents=True, exist_ok=True)
    path = QUEUE / f"daily-{today.isoformat()}-facebook.json"
    if path.exists():
        print('Daily queue item already exists:', path)
        return
    path.write_text(json.dumps(item, indent=2))
    print('Created daily Prestige Facebook queue item:', path)

if __name__ == '__main__':
    main()
