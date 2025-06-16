import flags from 'emoji-flags'
import axios from 'axios';

let nations = null;

export const loadNations = async () => {
    try {
        const response = await axios.get('/data/nations.json');
        nations = response.data;
    } catch (error) {
        console.error('국가 데이터를 불러오지 못했습니다.', error);
    }
}

export const getFlagByNationName = (name) => {

    if (!nations) {
        console.warn('nations 데이터가 아직 로딩되지 않음');
        return {};
    }

    const match = nations.find(n =>
        n.en.toLowerCase().includes(name.toLowerCase())
    );

    if (match) {
        const emojiFlag = flags.countryCode(match.iso2);
        return {
            iso2: match.iso2,
            iso3: match.iso3,
            emoji: emojiFlag ? emojiFlag.emoji : ''
        };
    }
    return {};
}